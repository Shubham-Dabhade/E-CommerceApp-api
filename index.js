const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");


dotenv.config();


mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("DB Connection successfull!");
}).catch((err)=>{
    console.log(err);
});

app.use(cors());
app.use(express.json());


//api routes
app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/product",productRoute);
app.use("/api/cart",cartRoute);
app.use("/api/order",orderRoute);
app.use("/api/checkout",stripeRoute);



app.listen(process.env.PORT || 8000,(req,res)=>{
    console.log("Application is running 8000");
});