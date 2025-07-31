const { Wishlist , WishlistItem , ProductVariant } = require('../models');

exports.viewWishlist = async ( req , res ) => {
    const userId = req.user.id;
    try{
        const wishlist = await Wishlist.findOne({
            where : {
                user_id : userId
            },
            include : {
                model : WishlistItem,
                include : {
                    model : ProductVariant
                },
            },
        });
        if(!wishlist){
            return res.json({ wishlistItems: [] });
        }

        res.json({ wishlistItems : wishlist.WishlistItems });
    }
    catch(err){
     res.status(500).json({ message: 'Error viewing wishlist' });
    }
};


exports.addToWishlist =  async (req , res) => {
    const userId = req.user.id;
    const { variant_id } = req.body;

    try{
        let wishlist = await Wishlist.findOne({where : { user_id : userId}});
        if(!wishlist)
        {
            wishlist = await Wishlist.create({user_id : userId});
        }

        let item = await WishlistItem.findOne({
            where: { wishlist_id : wishlist.wishlist_id , variant_id}
        });

        if(item){
            return res.json({ message: 'Already in wishlist' });
        }else{
            await WishlistItem.create({
                wishlist_id : wishlist.wishlist_id,
                variant_id
            })
            res.json({ message: 'Item added to wishlist' });
        }
    }catch(err){
    res.status(500).json({ message: 'Error adding to wishlist' });
    }
}

exports.removeFromWishlist =  async (req , res) => {
    const wishlist_item_id = req.params.id;

    try{
        let item = await WishlistItem.findByPk(wishlist_item_id);
        if(!item) return res.status(404).json({ message: 'Item not found' });

        await item.destroy();
        res.json({ message: 'Item removed from wishlist' });

    }catch(err){
    res.status(500).json({ message: 'Error in removing item from wishlist' });
    }
}