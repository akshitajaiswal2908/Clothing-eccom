const { ProductVariant, Product } = require('../models');

exports.getVariantsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const variants = await ProductVariant.findAll({ where: { product_id: productId } });
    res.json(variants);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch variants', error: err.message });
  }
};

exports.createVariant = async (req, res) => {
  try {
    const { productId } = req.params;

    // Check if product exists
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Validate required fields
    const { color, size, price, stock, image_url } = req.body;
    if (!color || !size || !price || stock === undefined || !image_url) {
      return res.status(400).json({
        message: 'Missing required fields: color, size, price, stock, image_url'
      });
    }

    // Create variant
    const variant = await ProductVariant.create({
      product_id: productId,
      color,
      size,
      price,
      stock,
      image_url
    });

    res.status(201).json({ message: 'Variant created', variant });

  } catch (err) {
    res.status(500).json({ message: 'Failed to create variant', error: err.message });
  }
};

exports.updateVariant = async (req, res) => {
  try {
    const { variantId } = req.params;
    const variant = await ProductVariant.findByPk(variantId);
    if (!variant) return res.status(404).json({ message: 'Variant not found' });

    const fieldsToUpdate = {};
    for (const key of Object.keys(req.body)) {
      if (req.body[key] !== undefined) fieldsToUpdate[key] = req.body[key];
    }

    await variant.update(fieldsToUpdate);
    res.json({ message: 'Variant updated', variant });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update variant', error: err.message });
  }
};

exports.deleteVariant = async (req, res) => {
  try {
    const { variantId } = req.params;
    const variant = await ProductVariant.findByPk(variantId);
    if (!variant) return res.status(404).json({ message: 'Variant not found' });

    await variant.destroy();
    res.json({ message: 'Variant deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete variant', error: err.message });
  }
};
