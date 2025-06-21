const express = require("express");
const paymentRouter = express.Router();
const razorpayInstance = require("../utils/razorpay");
const Payment = require("../models/payment");
const Service = require("../models/service");
const { validateWebhookSignature } = require("razorpay/dist/utils/razorpay-utils");

// POST /payment/create — Generate order from service IDs
paymentRouter.post("/payment/create", async (req, res) => {
  try {
    const { serviceIds, customer } = req.body;

    if (!serviceIds || !Array.isArray(serviceIds) || serviceIds.length === 0) {
      return res.status(400).json({ msg: "No services selected" });
    }

    const services = await Service.find({ _id: { $in: serviceIds } });

    if (!services.length) return res.status(404).json({ msg: "Services not found" });

    const amount = services.reduce((total, service) => total + service.price, 0);

    const order = await razorpayInstance.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        customerName: customer?.name || "Guest",
        email: customer?.email || "N/A",
      },
    });

    const payment = new Payment({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      status: order.status,
      services: services.map((s) => ({ title: s.title, price: s.price })),
      customer,
    });

    const saved = await payment.save();

    res.status(201).json({
      success: true,
      payment: saved,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error("Payment creation error:", err.message);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = paymentRouter;