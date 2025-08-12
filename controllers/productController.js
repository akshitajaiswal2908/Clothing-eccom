const { Product, Category, ProductVariant } = require('../models');

// GET /admin/products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: ['product_id', 'name', 'description', 'category_id'],
      include: [{ model: Category, attributes: ['name'] },        {
          model: ProductVariant,
          attributes: ['variant_id', 'price', 'image_url'],
          where: { is_default: true },required: false }]
    });
    const formattedProducts = products.map(p => ({
      product_id: p.product_id,
      name: p.name,
      description: p.description,
      category_id: p.category_id,
      category_name: p.Category?.name || null,
      price: p.ProductVariants?.[0]?.price || null,
      image_url: p.ProductVariants?.[0]?.image_url || null
    }));

    res.json(formattedProducts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products', error: err.message });
  }
};

// GET /admin/products/:id
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        { model: Category, attributes: ['category_id', 'name'] },
        { 
          model: ProductVariant, 
          attributes: ['variant_id', 'color', 'price', 'stock', 'image_url'] 
        }
      ]
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({
      id: product.product_id,
      name: product.name,
      description: product.description,
      category: {
        id: product.Category.category_id,
        name: product.Category.name
      },
      default_variant_id: product.ProductVariants[0]?.variant_id || null,
      variants: product.ProductVariants.map(v => ({
        id: v.variant_id,
        color: v.color,
        price: v.price,
        stock: v.stock,
        image: v.image_url || null
      }))
    });

  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch product', error: err.message });
  }
};



// POST /admin/products
exports.createProduct = async (req, res) => {
  try {
    const { name, description, category_id } = req.body;
    const product = await Product.create({ name, description, category_id });
    res.status(201).json({ message: 'Product created', product_id: product.product_id });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create product', error: err.message });
  }
};

// PUT /admin/products/:id
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const { name, description, category_id } = req.body;
    const fieldsToUpdate = {};
    if (name !== undefined) fieldsToUpdate.name = name;
    if (description !== undefined) fieldsToUpdate.description = description;
    if (category_id !== undefined) fieldsToUpdate.category_id = category_id;

    if (Object.keys(fieldsToUpdate).length === 0) {
      return res.status(400).json({ message: 'No fields to update' });
    }

    await product.update(fieldsToUpdate);
    res.json({ message: 'Product updated' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update product', error: err.message });
  }
};

// DELETE /admin/products/:id
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params; 
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    
    await ProductVariant.destroy({ where: { product_id: id } });


    await product.destroy();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete product', error: err.message });
  }
};
