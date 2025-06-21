const express = require("express");
const servicerouter = express.Router();
const Service = require("../models/service");

// GET /services — Get all services
servicerouter.get("/allServices", async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch services", error });
  }
});

// POST /services — Add a new service
servicerouter.post("/addService", async (req, res) => {
  const { title, description, price } = req.body;

  if (!title || !price) {
    return res.status(400).json({ message: "Title and Price are required" });
  }

  try {
    const existing = await Service.findOne({ title, price });
    if (existing) {
      return res.status(409).json({ message: "Service already exists" });
    }

    const newService = new Service({ title, description, price });
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ message: "Failed to add service", error });
  }
});


module.exports = servicerouter
