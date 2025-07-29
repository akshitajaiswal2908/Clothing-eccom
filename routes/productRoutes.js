const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const productController = require('../controllers/productController');

router.get('/products' , authMiddleware,  productController.getAllProducts);
router.get('/product/:id' , authMiddleware, productController.getProductById)

module.exports = router;