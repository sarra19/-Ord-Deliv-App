const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    cartItems: [
        {
            produit: { type: mongoose.Schema.Types.ObjectId, ref: 'Produit', required: true },
            quantity: { type: Number, default: 1 },
            //price: { type: Number, required: true }
        }
    ],
    totalAmount:String
}, { timestamps: true });


module.exports = mongoose.model('Cart', cartSchema);