const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const UserController = require("../controller/userController");

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
const upload = multer({ storage: storage });

router.post("/", UserController.register);
router.get("/:id/verify/:token/", UserController.verifToken);
router.post('/add', UserController.add);
router.get('/getall', UserController.getall);
router.get('/get/:id', UserController.getbyid);
router.get('/getbyname/:name', UserController.getbyname);

// Update route to handle file uploads
router.put('/updateUser/:id', upload.single('photoProfile'), UserController.UpdateUser);

router.delete('/deleteUser/:id', UserController.deleteUser);

module.exports = router;
