const express = require("express");
const router = express.Router();
const ResetController = require("../controller/resetController");

// send password link
router.post("/",ResetController.resetEmail );

// verify password reset link
router.get("/:id/:token",ResetController.verif );

//  set new password
router.post("/:id/:token",ResetController.newPass) ;

module.exports = router;