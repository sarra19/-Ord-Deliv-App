const express = require("express");
const router = express.Router();
const AddressController = require("../controller/adressController");

router.post("/addToUser", AddressController.addToUser);
router.get('/:id', AddressController.getAddressFromUser);
router.put("/update/:id", AddressController.updateAddress); // New route for updating address

module.exports = router;
