const express = require("express");
const router = express.Router();
const UserController = require("../controller/usercontroller");


router.post("/",UserController.register);
router.post('/add' ,UserController.add);
router.get('/getall' ,UserController.getall);
router.get('/get/:id' ,UserController.getbyid);
router.get('/getbyname/:name' ,UserController.getbyname);
router.put('/updateUser/:id', UserController.UpdateUser);
router.delete('/deleteUser/:id',UserController.deleteUser);
module.exports = router;
