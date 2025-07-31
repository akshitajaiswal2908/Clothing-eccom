const { Product, ProductVariant, Category } = require('../models');
const { propfind } = require('../routes/productRoutes');

//Get /api/products
exports.getAllProducts = async (req,res) => {
    try {
        const products = await Product.findAll({
            attributes: ['product_id', 'name', 'description', 'category_id'],
            include:[
                {
                    model: ProductVariant,
                    attributes: [ 'price' , 'image_url'],
                    where: { is_default: true },
                }
            ],
            raw: true
        });
            const formatted = products.map(p => ({
            product_id: p.product_id,
            name: p.name,
            description: p.description,
            category_id: p.category_id,
            price: p['ProductVariants.price'],
            image_url: p['ProductVariants.image_url']
        }));

        res.json(formatted);
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
                {model: ProductVariant, attributes:['variant_id', 'color', 'size', 'price', 'stock','image_url'] } 
            ]
        });

        if(!product) return res.status(404).json({ message: 'Product not found'});
        res.json(product);

    }catch (err) {
    res.status(500).json({ message: 'Failed to fetch product', error: err.message });
    }

};