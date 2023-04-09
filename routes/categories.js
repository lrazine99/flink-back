const bearerTokenFormated = require("../apiCallObject");
const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/categories", async (req, res) => {
  try {
    const { data } = await axios.get(
      `${process.env.API_ENDPOINT}/categories`,
      bearerTokenFormated
    );
    res.status(200).json({ message: data });
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});

module.exports = router;
