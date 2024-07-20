const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderStatus = ["en attend", "en cours", "livré","rejeté"];

const OrderStatus = new Schema({
    orderStatus: {
        type: String,
        enum: orderStatus,
    }
});

module.exports = mongoose.model("orderStatus", OrderStatus);