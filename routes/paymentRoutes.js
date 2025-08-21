const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middleware/authMiddleware'); 

//temporary remove authmiddleware for easy testing
router.post('/initiate-payment', paymentController.initiatePayment);
router.post('/verify-payment', paymentController.verifyPayment);

module.exports = router;
