const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const adminMiddleware = require('../../middleware/adminMiddleware');
const productController = require('../../controllers/productController');
const adminVariantRoutes = require('./adminVariantRoutes');


router.use(authMiddleware, adminMiddleware);

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

router.use('/:productId/variants', adminVariantRoutes);

module.exports = router;
