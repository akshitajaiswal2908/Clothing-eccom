const express = require('express');
const app = express();
const db = require('./models');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes'); 
const addressRoutes = require('./routes/addressRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const paymentRoutes = require('./routes/paymentRoutes');



//admin 
const adminAuthRoutes = require('./routes/admin/adminAuthRoutes');
const adminProductRoutes = require('./routes/admin/adminProductRoutes');


require('dotenv').config();

app.use(express.json());

app.use('/auth', authRoutes);    
app.use('/user', userRoutes); 
app.use('/address', addressRoutes);    
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/wishlist', wishlistRoutes);
app.use('/orders', orderRoutes);
app.use('/reviews', reviewRoutes);  
app.use('/payments', paymentRoutes);



//admin
app.use('/admin/auth', adminAuthRoutes);
app.use('/admin/products',adminProductRoutes );



db.sequelize.sync().then(() => {
  app.listen(3000, () => console.log('Server running on http://localhost:3000  and https://c1189a9cc144.ngrok-free.app/'));
});
