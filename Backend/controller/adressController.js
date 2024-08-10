const Address = require("../model/address");
const { User } = require("../model/user");

async function addToUser(req, res) {
  try {
    const { userId, address } = req.body;

    const newAddress = new Address(address);
    await newAddress.save();

    const user = await User.findById(userId);
    if (!user) throw new Error("Utilisateur non trouvé");

    user.addressId = newAddress._id;
    await user.save();

    res.status(200).json({ message: "Adresse ajoutée avec succès à l'utilisateur" });
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'adresse à l'utilisateur:", error.message);
    res.status(500).json({ error: error.message });
  }
}

async function getAddressFromUser(req, res) {
  try {
    const user = await User.findById(req.params.id).populate('addressId');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.addressId) {
      return res.status(404).json({ message: 'Address not found for this user' });
    }

    // Extract only the desired fields
    const address = user.addressId;
    const filteredAddress = {
      name: address.name,
      mobileNumber: address.mobileNumber,
      pinCode: address.pinCode,
      locality: address.locality,
      address: address.address,
      cityDistrictTown: address.cityDistrictTown,
      state: address.state,
      landmark: address.landmark,
      alternatePhone: address.alternatePhone,
      addressType: address.addressType,
    };

    res.json(filteredAddress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateAddress(req, res) {
  try {
    const { id } = req.params; // Extract addressId from URL params
    const addressData = req.body; // Extract addressData from request body

    // Find the address by ID and update it
    const updatedAddress = await Address.findByIdAndUpdate(id, addressData, { new: true });
    if (!updatedAddress) {
      return res.status(404).json({ message: 'Address not found' });
    }

    res.json({ message: "Address updated successfully", updatedAddress });
  } catch (error) {
    console.error("Error updating address:", error.message);
    res.status(500).json({ error: error.message });
  }
}


module.exports = {
  addToUser,
  getAddressFromUser,
  updateAddress,
};
