const express = require("express");
const router = express.Router();
const ProduitController = require("../controller/produitcontroller");

router.get('/add' ,ProduitController.add);
router.get('/getall' ,ProduitController.getall);
router.get('/get/:id' ,ProduitController.getbyid);
router.get('/getbyname/:name' ,ProduitController.getbyname);
router.put('/updateProduit/:id', ProduitController.UpdateProduit);
router.delete('/deleteProduit/:id',ProduitController.deleteProduit);
module.exports = router;
