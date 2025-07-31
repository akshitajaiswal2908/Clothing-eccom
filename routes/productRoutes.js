const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const productController = require('../controllers/productController');

router.get('/' , authMiddleware,  productController.getAllProducts);
router.get('/:id' , authMiddleware, productController.getProductById)

module.exports = router;