const crypto = require('crypto');
const { Order, Cart, CartItem } = require('../models');

exports.verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest('hex');

  if (generated_signature === razorpay_signature) {
    try {
      const order = await Order.findOne({ where: { razorpay_order_id } });
      if (!order) return res.status(404).json({ message: 'Order not found.' });

      order.status = 'Placed'; // update order status after payment success
      await order.save();

      const cart = await Cart.findOne({ where: { user_id: order.user_id } });
      if (cart) {
        await CartItem.destroy({ where: { cart_id: cart.cart_id } });
      }

      return res.json({ status: 'success', message: 'Payment verified and order updated.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error during verification.' });
    }
  } else {
    return res.status(400).json({ status: 'failure', message: 'Invalid payment signature.' });
  }
};
