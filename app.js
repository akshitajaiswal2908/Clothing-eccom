const express = require('express');
const app = express();
const db = require('./models');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes'); 
const addressRoutes = require('./routes/addressRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

require('dotenv').config();

app.use(express.json());

app.use('/auth', authRoutes);    
app.use('/user', userRoutes); 
app.use('/address', addressRoutes);    
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);


db.sequelize.sync().then(() => {
  app.listen(3000, () => console.log('Server running on http://localhost:3000'));
});
