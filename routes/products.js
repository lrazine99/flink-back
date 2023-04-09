const bearerTokenFormated = require("../apiCallObject");
const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/products", async (req, res) => {
  try {
    if (Object.entries(req?.body).length) {
      const { data } = await axios.post(
        `${process.env.API_ENDPOINT}/products`,
        req?.body,
        bearerTokenFormated
      );

      res.status(200).json({ message: data });
    } else {
      res.status(200).json({ message: [] });
    }
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});

router.get("/product/:sku", async (req, res) => {
  try {
    if (req?.params?.sku) {
      const { data } = await axios.get(
        `${process.env.API_ENDPOINT}/products/${req.params.sku}`,
        bearerTokenFormated
      );

      res.status(200).json({ message: data });
    } else {
      res.status(200).json({ message: [] });
    }
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});

router.get("/products/search", async (req, res) => {
  try {
    const { data } = await axios.get(
      `${process.env.API_ENDPOINT}/products/search?q=${req.query.q}&page_limit=50`,
      bearerTokenFormated
    );

    res.status(200).json({ message: data });
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});

module.exports = router;
