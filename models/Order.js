const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    products:[
        {
            productId:{
                type:String,
            },
            quantity:{
                type:Number,
                default:1,
            },
        },
    ],
    amount:{
        type:Number,
        required:true
    },
    address:{
        type:Object,  //stripe package will return us an object which would contain the address of the customer
        required:true,
    },
    status:{
        type:String,
        default:"pending",
    },
},{timestamps:true});


module.exports = mongoose.model("Order",OrderSchema);