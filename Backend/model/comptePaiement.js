const mongo = require("mongoose");
const Schema = mongo.Schema;
const Role = require('./role'); 
const ComptePaiement = new Schema({
 

});
module.exports = mongo.model("comptePaiement", ComptePaiement);
