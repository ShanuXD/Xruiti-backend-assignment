const {Schema, model} = require("mongoose")

const orderSchema = new Schema({
    date:{
        type:Date,
    },
    orderId:{
        type:Number,
        required:true
    },
    userId:{
        type:Number,
        required:true
    },
    subTotal:{
        type:Number,
        required:true
    },
})
const OrderModel = model("order", orderSchema);
module.exports = OrderModel;