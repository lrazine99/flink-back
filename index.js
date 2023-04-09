const express = require("express");
const cors = require("cors");

require("dotenv").config();

const ProductRoutes = require("./routes/products");
const CategoriesRoutes = require("./routes/categories");
const LocationsRoutes = require("./routes/locations");
const CartRoutes = require("./routes/cart");
const BackofficeRoutes = require("./routes/backoffice");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());
app.use(ProductRoutes);
app.use(CategoriesRoutes);
app.use(LocationsRoutes);
app.use(BackofficeRoutes);
app.use(CartRoutes);

mongoose.connect(process.env.BDD_ENDPOINT);

app.all("*", (req, res) => {
  res.status(404).send("Page introuvable");
});

app.listen(process.env.PORT || 3001, () => {
  console.log("Server has started");
});
