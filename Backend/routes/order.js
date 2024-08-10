const express = require("express");
const router = express.Router();
const OrderController = require("../controller/orderController");

router.post("/addOrder",OrderController.addOrder);
router.get("/getOrders", OrderController.getOrders);
router.post("/getOrder", OrderController.getOrder);
module.exports = router;