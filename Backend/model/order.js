const mongo = require("mongoose");
const { boolean } = require("yup");
const Schema = mongo.Schema;
const Order = new Schema({
    status: {
        type: String, 
        enum: OrderStatus.orderStatus,
    },
    cart:{
        type:Schema.Types.ObjectId,
        ref:"Cart",
      },
      dateOrd: {
        type: Date,
        required: true,
        default: Date.now
      },
      dateLiv: {
        type: Date
      }
});
module.exports = mongo.model("order", Order);
