const Produit = require("../model/produit");

async function add(req, res) {
  try {
    // Log the form data and uploaded files
    console.log("Form data:", req.body);
    console.log("Files:", req.files);

    // Extract file data from req.files
    const image = req.files['image'] ? req.files['image'][0].path : null;
    const video = req.files['video'] ? req.files['video'][0].path : null;

    // Create a new produit object with form data and file paths
    const produitData = {
      ...req.body,
      image: image,
      video: video
    };

    // Create and save the new produit
    const produit = new Produit(produitData);
    await produit.save();

    res.status(200).send("Produit ajouté avec succès");
  } catch (err) {
    console.error("Erreur lors de l'ajout du produit:", err); // Improved error logging
    res.status(400).json({ error: err.message }); // Send error message to the client
  }
}

async function getall (req,res){
  try{
      const data = await Produit.find();
     
      res.status(200).send(data)
      }catch(err){
          res.status(400).send(err);
      }
}

async function getbyid (req,res){
  try{
      const data = await Produit.findById(req.params.id);
     
      res.status(200).send(data)
      }catch(err){
          res.status(400).send(err);
      }
}

async function getbyname(req,res){
  try{
      let name = req.params.firstname;
      const dataname = await Produit.findOne({name});
     
      res.status(200).send(dataname)
      }catch(err){
          res.status(400).send( err);
      }
}

async function UpdateProduit(req, res){
  try {
     await Produit.findByIdAndUpdate(req.params.id, req.body);
     res.status(200).send("data updated")

  } catch (err) {
      res.status(400).json(err);
  }
}
async function deleteProduit (req, res) {
  try {
     await Produit.findByIdAndDelete(req.params.id);
     res.status(200).send("Produit deleted")

  } catch (err) {
      res.status(500).json(err);
  }
}




module.exports = {
  add,
  getall,
  getbyid,
  getbyname,
  UpdateProduit,
  deleteProduit,

 
};
