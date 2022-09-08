const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    delivery: {
      type: String,
      required: true,
    },
    location: {
        type: String,
        required: true,
      },
  },
);
module.exports = mongoose.model("products", productSchema);
