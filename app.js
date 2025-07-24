const express = require('express');
const app = express();
const db = require('./models');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes'); 
const addressRoutes = require('./routes/addressRoutes');


require('dotenv').config();

app.use(express.json());

app.use('/api/auth', authRoutes);    
app.use('/api/user', userRoutes); 
app.use('/api/user', addressRoutes);    

db.sequelize.sync().then(() => {
  app.listen(3000, () => console.log('Server running on http://localhost:3000'));
});
