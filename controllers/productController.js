const { Product, ProductVariant, Category } = require('../models');
const { propfind } = require('../routes/productRoutes');

//Get /api/products
exports.getAllProducts = async (req,res) => {
    try {
        const products = await Product.findAll({
            include:[
                {   model : Category, attributes: ['name'] },
                {
                    model : ProductVariant, 
                    attributes: ['variant_id', 'color', 'size', 'price', 'stock']
                }
            ]
        });
        res.json(products);
    }catch(err){
        res.status(500).json({ message: 'Failed to fetch products', error: err.message });
    }
};


// GET /api/products/:id
exports.getProductById = async (req, res) => {

    const { id } = req.params;

    try{
        const product = await Product.findByPk(id, {
            include:[
                {model: Category, attributes: ['name']},
                {model: ProductVariant, attributes:['variant_id', 'color', 'size', 'price', 'stock'] } 
            ]
        });

        if(!product) return res.status(404).json({ message: 'Product not found'});
        res.json(product);

    }catch (err) {
    res.status(500).json({ message: 'Failed to fetch product', error: err.message });
    }

};