const mongo = require("mongoose");
const { boolean } = require("yup");
const Schema = mongo.Schema;
const Produit = new Schema({
  nomProd: String,
  image: String,
  categorie: String,
  prix: Number,
  quantite: Number,
  marque: String,
  taille: String,
  couleur: String,
  description: String,
  video: String,
  enStock: Boolean,


  reviews: [
    {
        userId: {type: Schema.Types.ObjectId, ref: 'User'},
        review: String
    }
],
  createdBy: { type: Schema.Types.ObjectId, ref: 'User'},
  updatedAt: Date,

}, { timestamps: true });
module.exports = mongo.model("Produit", Produit);
