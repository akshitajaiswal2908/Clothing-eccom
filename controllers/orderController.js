const razorpay = require('../utils/razorpay');
const { Order, OrderItem, ProductVariant, Address, Cart, CartItem } = require('../models');

// Place Order from Cart
exports.placeOrder = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { address_id } = req.body;

    const cart = await Cart.findOne({ where: { user_id } });
    if (!cart) return res.status(400).json({ message: 'Cart not found.' });

    const cartItems = await CartItem.findAll({
      where: { cart_id: cart.cart_id },
      include: { model: ProductVariant }
    });

    if (!cartItems.length) return res.status(400).json({ message: 'Cart is empty.' });

    let total_amount = 0;
    cartItems.forEach(item => {
      total_amount += item.quantity * item.ProductVariant.price;
    });
  
    // Razorpay Integration
    const options = {
      amount: total_amount * 100,  // amount in paise(razor only accepts paise
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
      payment_capture: 1 // auto capture payment
    };

    const razorpayOrder = await razorpay.orders.create(options);
    /////////////

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

    // await CartItem.destroy({ where: { cart_id: cart.cart_id } });

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

// View All Orders of User
exports.viewAllOrders = async (req, res) => {
  try {
    const user_id = req.user.id;

    const orders = await Order.findAll({
      where: { user_id },
      include: [
        {
          model: OrderItem,
          include: ProductVariant
        },
        {
          model: Address
        }
      ]
    });

    return res.status(200).json({ orders });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error.' });
  }
};

// View Single Order
exports.viewSingleOrder = async (req, res) => {
  try {
    const user_id = req.user.id;
    const order_id = req.params.id;

    const order = await Order.findOne({
      where: { order_id, user_id },
      include: [
        {
          model: OrderItem,
          include: ProductVariant
        },
        {
          model: Address
        }
      ]
    });

    if (!order) return res.status(404).json({ message: 'Order not found.' });

    return res.status(200).json({ order });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error.' });
  }
};

// Cancel Order
exports.cancelOrder = async (req, res) => {
  try {
    const user_id = req.user.id;
    const order_id = req.params.id;

    const order = await Order.findOne({ where: { order_id, user_id } });
    if (!order) return res.status(404).json({ message: 'Order not found.' });

    if (order.status !== 'Placed') {
      return res.status(400).json({ message: 'Only placed orders can be cancelled.' });
    }

    order.status = 'Cancelled';
    await order.save();

    return res.status(200).json({ message: 'Order cancelled.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error.' });
  }
};
