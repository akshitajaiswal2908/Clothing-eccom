const { Review, Order, OrderItem, ProductVariant , User } = require('../models');
const { Op } = require('sequelize');

// Create a review
exports.createReview = async (req, res) => {  
  try {
    const user_id = req.user.id; 
    const { product_id, rating, comment } = req.body;

    if (!product_id || !rating) {
      return res.status(400).json({ error: 'Product ID and rating are required.' });
    }

    const variants = await ProductVariant.findAll({
      where: { product_id },
      attributes: ['variant_id'],
      raw: true
    });

    const variantIds = variants.map(({ variant_id }) => variant_id);
    const hasPurchased = await Order.findOne({
      where: {
        user_id,
        status: 'delivered'
      },
      include: {
        model: OrderItem,
        where: {
          variant_id: { [Op.in]: variantIds }
        },
        required: true
      }
    });

    if (!hasPurchased) {
      return res.status(403).json({
        error: 'You can only review products you have purchased and received.'
      });
    }


    const existingReview = await Review.findOne({
      where: { user_id, product_id }
    });

    if (existingReview) {
      return res.status(400).json({ error: 'User has already reviewed this product.' });
    }

    const review = await Review.create({
      user_id,
      product_id,
      rating,
      comment
    });

    res.status(201).json({
      message: 'Review created successfully',
    });

  } catch (error) {
    res.status(500).json({ error: 'Failed to create review'});
  }
};

// Get all reviews for a product
exports.getReviewsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.findAll({
      where: { product_id: productId },
      include: [
        {
          model: User,
          attributes: ['user_id', 'name']
        }
      ]
    });

    res.status(200).json({
      product_id: productId,
      reviews: reviews.map(r => ({
        review_id: r.review_id,
        user_id: r.user_id,
        user_name: r.User.name,
        rating: r.rating,
        comment: r.comment
      }))
    });

  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews'});
  }
};

// Update a review
exports.updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    const review = await Review.findByPk(reviewId);

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    review.rating = rating ?? review.rating;
    review.comment = comment ?? review.comment;

    await review.save();

    res.json({
      message: 'Review updated successfully'});

  } catch (error) {
    console.error("UPDATE REVIEW ERROR:", error);
    res.status(500).json({ error: 'Failed to update review'});
  }
};

// Delete a review
exports.deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const deleted = await Review.destroy({
      where: { review_id: reviewId }
    });

    if (!deleted) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.json({ message: 'Review deleted successfully' });

  } catch (error) {
    res.status(500).json({ error: 'Failed to delete review'});
  }
};
