const express = require('express');
const router = express.Router({ mergeParams: true }); // to access productId param

const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const variantController = require('../controllers/variantController');

router.use(authMiddleware, adminMiddleware);

// Get all variants of a product
router.get('/', variantController.getVariantsByProduct);

// Create variant for product
router.post('/', variantController.createVariant);

// Update a specific variant
router.put('/:variantId', variantController.updateVariant);

// Delete a specific variant
router.delete('/:variantId', variantController.deleteVariant);

module.exports = router;
