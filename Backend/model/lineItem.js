const mongo = require("mongoose");
const { boolean } = require("yup");
const Schema = mongo.Schema;
const LineItem = new Schema({
 quantiteItem:Number,
 prixItem:Number,
 produit:{
    type:Schema.Types.ObjectId,
    ref:"Produit",
  }


});
module.exports = mongo.model("lineItem", LineItem);
