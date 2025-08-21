const razorpay = require('../config/razorpay');
const { Order, OrderItem, ProductVariant, Address, Cart, CartItem } = require('../models');

exports.placeOrder = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { address_id } = req.body;

    const cart = await Cart.findOne({ where: { user_id } });
    if (!cart) return res.status(400).json({ message: 'Cart not found.' });

    const cartItems = await CartItem.findAll({
      where: { cart_id: cart.cart_id },
      include: ProductVariant
    });
    if (!cartItems.length) return res.status(400).json({ message: 'Cart is empty.' });

    let total_amount = 0;
    cartItems.forEach(item => {
      total_amount += item.quantity * item.ProductVariant.price;
    });

    const options = {
      amount: total_amount * 100,
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
      payment_capture: 1
    };

    const razorpayOrder = await razorpay.orders.create(options);

    const order = await Order.create({
      user_id,
      address_id,
      total_amount,
      razorpay_order_id: razorpayOrder.id,
      status: 'Pending'
    });

    for (const item of cartItems) {
      await OrderItem.create({
        order_id: order.order_id,
        variant_id: item.variant_id,
        quantity: item.quantity,
        price: item.ProductVariant.price
      });
    }

    return res.status(201).json({
      message: 'Order created, please complete payment',
      order_id: order.order_id,
      razorpay_order: razorpayOrder
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error.' });
  }
};

exports.viewAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { user_id: req.user.id },
      include: [
        { model: OrderItem, include: ProductVariant },
        { model: Address }
      ]
    });
    res.status(200).json({ orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
};

exports.viewSingleOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      where: { order_id: req.params.id, user_id: req.user.id },
      include: [
        { model: OrderItem, include: ProductVariant },
        { model: Address }
      ]
    });
    if (!order) return res.status(404).json({ message: 'Order not found.' });
    res.status(200).json({ order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ where: { order_id: req.params.id, user_id: req.user.id } });
    if (!order) return res.status(404).json({ message: 'Order not found.' });

    if (order.status !== 'Placed') return res.status(400).json({ message: 'Only placed orders can be cancelled.' });

    order.status = 'Cancelled';
    await order.save();

    res.status(200).json({ message: 'Order cancelled.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
};
