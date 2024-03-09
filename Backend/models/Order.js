const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    userData: {type: Object, required: true},
    cartItems: { type: Array, required:  true},
    totalAmount: {type: Number, require: true},
    status: { type: String, default: 'confirmed'},
    createdAt: {type: Date, default: Date.now()}
});

const Order = mongoose.model('Orden', orderSchema);

module.exports = Order; 