const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, orderController.placeOrder);
router.get('/', authMiddleware, orderController.viewAllOrders);
router.get('/:id', authMiddleware, orderController.viewSingleOrder);
router.patch('/:id/cancel', authMiddleware, orderController.cancelOrder);

module.exports = router;


