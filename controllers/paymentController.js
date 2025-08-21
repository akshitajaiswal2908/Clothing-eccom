const crypto = require('crypto');
const razorpay = require('../config/razorpay');
const { Order, Cart, CartItem, OrderItem, ProductVariant } = require('../models');

exports.initiatePayment = async (req, res) => {
  try {
    const user_id = req.user ? req.user.id : 1; // EASY for testing
    const { order_id } = req.body;

    const order = await Order.findOne({
      where: { order_id, user_id },
      include: [{ model: OrderItem, include: ProductVariant }]
    });
    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Prevent double payment
    if (order.status === 'Placed') {
      return res.status(400).json({ message: 'Payment already completed for this order' });
    }

    const options = {
      amount: order.total_amount * 100,
      currency: 'INR',
      receipt: `receipt_${order.order_id}`,
      payment_capture: 1
    };

    const razorpayOrder = await razorpay.orders.create(options);
    order.razorpay_order_id = razorpayOrder.id;
    await order.save();

    res.status(201).json({
      status: 'created',
      order_id: order.order_id,
      razorpay_order: razorpayOrder,
      key_id: process.env.RAZORPAY_KEY_ID
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error initiating payment' });
  }
};

exports.verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest('hex');

  if (generated_signature !== razorpay_signature) {
    return res.status(400).json({ status: 'failure', message: 'Invalid payment signature' });
  }

  try {
    const order = await Order.findOne({ where: { razorpay_order_id } });
    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Prevent double payment
    if (order.status === 'Placed') {
      return res.status(400).json({ status: 'failure', message: 'Payment already completed for this order' });
    }

    order.status = 'Placed';
    await order.save();

    const cart = await Cart.findOne({ where: { user_id: order.user_id } });
    if (cart) await CartItem.destroy({ where: { cart_id: cart.cart_id } });

    res.json({ status: 'success', message: 'Payment verified and order placed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during verification' });
  }
};
