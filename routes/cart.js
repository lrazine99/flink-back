const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const Orders = require("../models/Orders");

router.post("/checkout", async ({ body: { formData } }, res) => {
  try {
    if (formData) {
      const newOrder = new Orders({
        firstName: formData.firstName,
        lastName: formData.lastName,
        mail: formData.mail,
        phone: formData.phone,
        date: formData.date,
        address: formData.adress,
        counter: formData.counter,
      });

      await newOrder.save();

      res.status(200).json({ message: true });
    }
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});

router.post("/pay", async (req, res) => {
  const stripeToken = req.body.stripeToken;
  const response = await stripe.charges.create({
    amount: 2000,
    currency: "eur",
    description: "La description de l'objet acheté",
    source: stripeToken,
  });

  res.json(response);
});

module.exports = router;
