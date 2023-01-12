const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  user_id: String,
  description: String,
});

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 5,
  },
  description: {
    type: String,
    validate: {
      validator: (value) => {
        //Suppose description cannot contain the word "hello"
        return !value.includes("hello");
      },
      message: "Description cannot contain the world 'hello'",
    },
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Price must be a positive number"],
  },
  stock: Number,
  reviews: [ReviewSchema],
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
