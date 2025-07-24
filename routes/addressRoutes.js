const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addressController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/address', authMiddleware, addressController.addAddress);
router.get('/address', authMiddleware, addressController.getAddresses);
router.put('/address/:id', authMiddleware, addressController.updateAddress);
router.delete('/address/:id', authMiddleware, addressController.deleteAddress);

module.exports = router;
