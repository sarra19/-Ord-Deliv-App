const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Role = require('./role'); 
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new Schema({
  prenom: {type:String,required:true},
  nom: {type:String,required:true},
  email: {type:String,required:true},
  mdpass: {type:String,required:true},
  role: {
    type: String, 
    enum: Role.validRoles,
},
  adresse: String,
  photoProfile: String,
  dateNaissance: String,
  tel: Number,
  Genre: String,

});
userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		prenom: Joi.string().required().label("Prenom"),
		nom: Joi.string().required().label("Nom"),
		email: Joi.string().email().required().label("Email"),
		mdpass: passwordComplexity().required().label("Mot de passe"),
	});
	return schema.validate(data);
};
module.exports = { User, validate };