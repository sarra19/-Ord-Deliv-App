const express = require("express");
const router = express.Router();
const OrderController = require("../controller/ordercontroller");

router.post("/addOrder",OrderController.addOrder);
router.get("/getOrders", OrderControllergetOrders);
router.post("/getOrder", OrderController.getOrder);
module.exports = router;