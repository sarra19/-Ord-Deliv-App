const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new Schema({
  prenom: {type:String,required:true},
  nom: {type:String,required:true},
  email: {type:String,required:true},
  mdpass: {type:String,required:true},
  role: { type: String, enum: ['client', 'admin', 'livreur'], required: true }, // Ensure this field exists and is properly defined

  addressId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },
  photoProfile: String,
  dateNaissance: String,
  tel: Number,
  Genre: String,
  verified: { type: Boolean, default: false },


}, { timestamps: true });
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
    role: Joi.string().valid('client', 'admin', 'livreur').required()

	});
	return schema.validate(data);
};
module.exports = { User, validate };