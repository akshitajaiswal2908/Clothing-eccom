const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middleware/authMiddleware'); 

router.post('/verify-payment', authMiddleware, paymentController.verifyPayment);

module.exports = router;
 