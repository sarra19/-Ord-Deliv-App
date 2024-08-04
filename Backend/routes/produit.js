const express = require("express");
const router = express.Router();
const ProduitController = require("../controller/produitcontroller");
const multer = require("multer");
const path = require("path");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directory to save files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // File naming
  }
});

// Filtrage des fichiers par type MIME
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|mp4/;
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Type de fichier non supporté"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

router.post('/add',upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]),ProduitController.add);
router.get('/getall' ,ProduitController.getall);
router.get('/get/:id' ,ProduitController.getbyid);
router.get('/getbyname/:name' ,ProduitController.getbyname);
router.put('/updateProduit/:id', ProduitController.UpdateProduit);
router.delete('/deleteProduit/:id',ProduitController.deleteProduit);
module.exports = router;
