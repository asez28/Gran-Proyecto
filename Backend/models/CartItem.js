const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  id: { type: mongoose.Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  cantidad: { type: Number, required: true },
  price: { type: Number, required: true },
  basePrice: { type: Number, required: true },
  thumbnailUrl: {type: String, required: true}
});

const CartItem = mongoose.model("CartItem", cartItemSchema);

module.exports = CartItem;