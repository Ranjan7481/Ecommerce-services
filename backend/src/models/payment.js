const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true },
    paymentId: { type: String },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    receipt: { type: String, required: true },
    status: { type: String, required: true },
    services: [
      {
        title: String,
        price: Number,
      },
    ],
    customer: {
      name: String,
      email: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);