const express = require("express");
const router = express.Router();
const CartController = require("../controller/cartController");

router.post('/add-to-cart', CartController.addToCart);
// Route pour obtenir les articles du panier
router.get('/get-cart-items/:userId', CartController.getCartItems);
// Route pour supprimer un article du panier
router.delete('/remove-item', CartController.removeItem);

module.exports = router;
