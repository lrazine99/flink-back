const mongoose = require("mongoose");
const { Schema } = mongoose;

const Orders = mongoose.model("Orders", {
  firstName: { type: String },
  lastName: { type: String },
  mail: { type: String },
  phone: { type: String },
  date: { type: String },
  address: { type: String },
  counter: { type: Schema.Types.Mixed },
});

module.exports = Orders;
