const { Cart, CartItem, ProductVariant } = require('../models');


exports.viewCart = async (req, res) => {
    const userId = req.user.id;
    try{
        const cart = await Cart.findOne({
            where: {
                user_id: userId
            },
            include: {
                model : CartItem,
                include: {model : ProductVariant },
            },
        });

        if(!cart){
            return res.json({ cartItems: [] });
        }

        res.json({ cartItems: cart.CartItems });
    }catch(err){
     res.status(500).json({ message: 'Error viewing cart' });
    }
};

exports.addToCart = async (req, res) => {
    const userId = req.user.id;
    const {variant_id , quantity} =  req.body;

    try{
        let cart = await Cart.findOne({where : {user_id : userId}});
        if(!cart){
            cart = await Cart.create({user_id : userId});
        }

        let item = await CartItem.findOne({
            where: {cart_id : cart.cart_id, variant_id}
        });

        if(item)
        {
            item.quantity += quantity;
            await item.save();
        }else{
            await CartItem.create({
                cart_id: cart.cart_id,
                variant_id,
                quantity,
            })
        }
    res.json({ message: 'Item added to cart' });
    }catch(err){
    res.status(500).json({ message: 'Error adding to cart' });
    }
};

exports.removeFromCart = async (req, res) => {
    const cart_item_id = req.params.id;
    try{
        const item = await CartItem.findByPk(cart_item_id);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        await item.destroy();
        res.json({ message: 'Item removed from cart' });

    }catch(err){
        res.status(500).json({ message: 'Error removing item' });
    }
};

exports.updateQuantity = async (req, res) => {
  const cart_item_id = req.params.id;
  const { quantity } = req.body;
  try{
    const item = await CartItem.findByPk(cart_item_id);

    if(!item)return res.status(404).json({message : 'Item not Found'});

    item.quantity = quantity;
    await item.save();
    res.json({ message: 'Quantity updated' });

  }catch(err){
    res.status(500).json({ message: 'Error updating quantity' });
  }
};

