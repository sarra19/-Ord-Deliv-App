const Produit = require("../model/produit");

async function add(req, res) {
  try {
    console.log("data", req.body);
    const produit = new Produit(req.body);
    await produit.save();
    res.status(200).send("add good");
  } catch (err) {
    res.status(400).send({ error: err });
    //console.log();
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
