const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addressController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, addressController.addAddress);
router.get('/', authMiddleware, addressController.getAddresses);
router.put('/:id', authMiddleware, addressController.updateAddress);
router.delete('/:id', authMiddleware, addressController.deleteAddress);

module.exports = router;
