const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const connectDB = require("./config/db");

dotenv.config();
const app = express();

app.use(cors({
  origin:  "http://localhost:5173",
  credentials :true,
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send({
    activeStatus:true,
    error:false


  });
})


// Get Services
// app.get("/services", async (req, res) => {
//   const services = await Service.find();
//   res.json(services);
// });

// // Create Razorpay Order
// app.post("/create-order", async (req, res) => {
//   const instance = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY,
//     key_secret: process.env.RAZORPAY_SECRET,
//   });

//   const options = {
//     amount: req.body.amount * 100,
//     currency: "INR",
//     receipt: "receipt#1",
//   };

//   const order = await instance.orders.create(options);
//   res.json(order);
// });


const serviceRouter = require("./routes/services");
const paymentRouter = require("./routes/paymentRouter");
app.use("/", serviceRouter);
app.use("/", paymentRouter);

// Start server
connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777...");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
  });
