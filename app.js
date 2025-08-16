const express = require('express');
const app = express();
const db = require('./models');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

// import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes'); 
const addressRoutes = require('./routes/addressRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// Admin routes
const adminAuthRoutes = require('./routes/admin/adminAuthRoutes');
const adminProductRoutes = require('./routes/admin/adminProductRoutes');

// Google login 
const session = require('express-session');
const passport = require('./config/passport'); 

// Middlewares
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// APIs  Routes
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
app.use('/admin/products', adminProductRoutes);

app.get('/delete-data.html', (req, res) => {
  res.send(`
    <h1>User Data Deletion</h1>
    <p>If you want your Facebook login data to be deleted from our servers, please send an email to <strong>akshitajaiswal2908@gmail.com</strong> with your name and registered email.</p>
  `);
});



db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Database sync failed:', err);
});

 