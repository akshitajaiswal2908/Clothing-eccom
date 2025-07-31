const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, cartController.viewCart);
router.post('/add', authMiddleware, cartController.addToCart);
router.delete('/:id', authMiddleware, cartController.removeFromCart);
router.put('/:id', authMiddleware, cartController.updateQuantity);

module.exports = router;