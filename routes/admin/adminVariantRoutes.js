const express = require('express');
const router = express.Router({ mergeParams: true }); // mergeParams is needed so productId comes from parent route
const authMiddleware = require('../../middleware/authMiddleware');
const adminMiddleware = require('../../middleware/adminMiddleware');
const variantController = require('../../controllers/variantController');

router.use(authMiddleware, adminMiddleware);

// GET all variants 
router.get('/', variantController.getVariantsByProduct);

// POST  variant for a product
router.post('/', variantController.createVariant);

// PUT  variant
router.put('/:variantId', variantController.updateVariant);

// DELETE variant
router.delete('/:variantId', variantController.deleteVariant);

module.exports = router;
