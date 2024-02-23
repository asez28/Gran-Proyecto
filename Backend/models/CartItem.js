const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    productId: { type: mongoose.Schema.Types.ObjectId, required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: {type: Number, required: true},
    basePrice: {type: Number, required: true}
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;
