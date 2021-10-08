const {Schema, model} = require("mongoose")

const userSchema = new Schema({
    userId:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    numberOfOrders:{
        type:Number,
        default:0
    }
})
const UserModel = model("User", userSchema);
module.exports = UserModel;