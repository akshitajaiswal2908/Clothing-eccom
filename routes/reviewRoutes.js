const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const reviewController = require('../controllers/reviewController');

// Create a review
router.post('/', authMiddleware, reviewController.createReview);

// Get all reviews for a product
router.get('/product/:productId', authMiddleware, reviewController.getReviewsByProduct);

// Update a review
router.put('/:reviewId', authMiddleware, reviewController.updateReview);

// Delete a review
router.delete('/:reviewId', authMiddleware, reviewController.deleteReview);

module.exports = router;
