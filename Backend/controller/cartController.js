const Cart = require('../model/cart'); // Assurez-vous que le chemin est correct
const Produit = require('../model/produit'); // Assurez-vous que le chemin est correct

// Ajouter un produit au panier
async function addToCart (req, res){
    const { userId, produitId, quantity } = req.body;

    try {
        // Vérifiez si le produit existe
        const produit = await Produit.findById(produitId);
        if (!produit) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }

        // Trouvez ou créez le panier de l'utilisateur
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({ user: userId, cartItems: [] });
        }

        // Vérifiez si le produit est déjà dans le panier
        const existingItemIndex = cart.cartItems.findIndex(item => item.produit.toString() === produitId);

        if (existingItemIndex > -1) {
            // Mettre à jour la quantité si le produit est déjà dans le panier
            cart.cartItems[existingItemIndex].quantity += quantity;
        } else {
            // Ajouter le produit au panier
            cart.cartItems.push({ produit: produitId, quantity });
        }

        // Enregistrez le panier
        await cart.save();
        res.status(200).json({ message: 'Produit ajouté au panier', cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

async function getCartItems (req, res) {
    
    const { userId } = req.params;

    try {
        // Trouver le panier de l'utilisateur
        const cart = await Cart.findOne({ user: userId }).populate('cartItems.produit');

        if (!cart) {
            return res.status(404).json({ message: 'Panier non trouvé' });
        }

        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};
async function removeItem  (req, res)  {
    const { userId, produitId } = req.body;

    try {
        // Trouver le panier de l'utilisateur
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Panier non trouvé' });
        }

        // Filtrer les articles du panier pour supprimer le produit spécifié
        cart.cartItems = cart.cartItems.filter(item => item.produit.toString() !== produitId);

        // Enregistrez le panier mis à jour
        await cart.save();
        res.status(200).json({ message: 'Article supprimé du panier', cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

module.exports = {
    addToCart,
    getCartItems ,
    removeItem ,
}