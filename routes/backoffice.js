const express = require("express");
const router = express.Router();
const Orders = require("../models/Orders");

router.get("/backoffice/orders", async (req, res) => {
  try {
    const data = await Orders.find();

    res.status(200).json({ message: data });
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});

module.exports = router;
