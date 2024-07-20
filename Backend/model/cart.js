const mongo = require("mongoose");
const { boolean } = require("yup");
const Schema = mongo.Schema;
const Cart = new Schema({
 NumberProd:Number,
 lineItems: [{
    type: Schema.Types.ObjectId,
    ref: "LineItem",
    required: true
  }]

});
module.exports = mongo.model("cart", Cart);
