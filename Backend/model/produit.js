const mongo = require("mongoose");
const { boolean } = require("yup");
const Schema = mongo.Schema;
const Produit = new Schema({
  nomProd: String,
  imageURL: String,
  categorie: String,
  prix: Number,
  quantite: Number,
  marque: String,
  taille: String,
  couleur: String,
  description: String,
  video: String,
  enStock: Boolean,



});
module.exports = mongo.model("produit", Produit);
