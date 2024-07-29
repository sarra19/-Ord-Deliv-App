const { User, validate } = require("../model/user");
const bcrypt = require("bcrypt");
const Token = require("../model/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const mongoose = require("mongoose");

async function register(req, res) {
  try {
    // Validate request body
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    // Check if user already exists
    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(409).send({ message: "User with this email already exists!" });

    // Hash the password
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.mdpass, salt);

    // Validate the role field before saving
    if (!['client', 'admin', 'livreur'].includes(req.body.role)) {
      return res.status(400).send({ message: "Role is not allowed" });
    }

    // Create new user
    const newUser = new User({ ...req.body, mdpass: hashPassword });
    await newUser.save();

    // Create a verification token for the new user
    const token = await new Token({
      userId: newUser._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    // Send verification email
    const url = `${process.env.BASE_URL}user/${newUser._id}/verify/${token.token}`;
    await sendEmail(newUser.email, "Vérifier votre adresse Email", url);

    // Respond with success message
    res.status(201).send({ message: "Un e-mail a été envoyé à votre compte pour vérification." });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send({ message: "Erreur interne du serveur" });
  }
}


async function verifToken(req, res) {
  try {
    // Validate the user ID format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).send({ message: "user ID Invalid" });
    }

    // Find the user by ID
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(400).send({ message: "Lien invalide" });
    }

    // Find the token associated with the user
    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) {
      return res.status(400).send({ message: "Lien invalide" });
    }

    // Update the user to set verified to true
    await User.updateOne({ _id: user._id }, { verified: true });

    // Remove the token
   // await token.remove();

    // Send success response
    res.status(200).send({ message: "E-mail vérifié avec succès" });
  } catch (error) {
    console.error("Erreur lors de la vérification du token", error); // Log the error for debugging
    res.status(500).send({ message: "Erreur interne du serveur" });
  }
}


async function add(req, res) {
  try {
    console.log("data", req.body);
    const user = new User(req.body);
    await user.save();
    res.status(200).send("add good");
  } catch (err) {
    res.status(400).send({ error: err });
    //console.log();
  }
}
async function getall (req,res){
  try{
      const data = await User.find();
     
      res.status(200).send(data)
      }catch(err){
          res.status(400).send(err);
      }
}

async function getbyid (req,res){
  try{
      const data = await User.findById(req.params.id);
     
      res.status(200).send(data)
      }catch(err){
          res.status(400).send(err);
      }
}

async function getbyname(req,res){
  try{
      let name = req.params.firstname;
      const dataname = await User.findOne({name});
     
      res.status(200).send(dataname)
      }catch(err){
          res.status(400).send( err);
      }
}

async function UpdateUser(req, res){
  try {
     await User.findByIdAndUpdate(req.params.id, req.body);
     res.status(200).send("data updated")

  } catch (err) {
      res.status(400).json(err);
  }
}
async function deleteUser (req, res) {
  try {
     await User.findByIdAndDelete(req.params.id);
     res.status(200).send("User deleted")

  } catch (err) {
      res.status(500).json(err);
  }
}




module.exports = {
  register,
  add,
  getall,
  getbyid,
  getbyname,
  UpdateUser,
  deleteUser,
  verifToken,
 
};
