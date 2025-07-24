const { Address } = require('../models');

// Add address
exports.addAddress = async (req, res) => {
  const { street, city, state, zip } = req.body;

  try {
    const address = await Address.create({
      user_id: req.user.id,
      street, city, state, zip
    });
    res.status(201).json({ message: 'Address added', address });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add address', error: err.message });
  }
};

// Get addresses
exports.getAddresses = async (req, res) => {
  try {
    const addresses = await Address.findAll({ where: { user_id: req.user.id } });
    res.json(addresses);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch addresses', error: err.message });
  }
};

// Update address
exports.updateAddress = async (req, res) => {
  const { id } = req.params;
  const { street, city, state, zip } = req.body;

  try {
    const address = await Address.findOne({ where: { address_id: id, user_id: req.user.id } });
    if (!address) return res.status(404).json({ message: 'Address not found' });

    address.street = street || address.street;
    address.city = city || address.city;
    address.state = state || address.state;
    address.zip = zip || address.zip;

    await address.save();
    res.json({ message: 'Address updated', address });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update address', error: err.message });
  }
};

// Delete address
exports.deleteAddress = async (req, res) => {
  const { id } = req.params;

  try {
    const rows = await Address.destroy({ where: { address_id: id, user_id: req.user.id } });
    if (!rows) return res.status(404).json({ message: 'Address not found' });

    res.json({ message: 'Address deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete address', error: err.message });
  }
};
