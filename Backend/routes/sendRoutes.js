// sendRoutes.js
const express = require('express');
const authRequired = require('../middlewares/validateToken');
const CartItem = require('../models/CartItem');
const User = require('../models/User');

const router = express.Router();

router.get('/checkout', authRequired, async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId);

        const cartItems = await CartItem.find({ userId: userId });

        let totalAmount = 0;
        cartItems.forEach((item) => {
            totalAmount += item.price;
        });

        res.status(200).json({
            user: user,
            cartItems: cartItems,
            totalAmount: totalAmount
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los datos del usuario y el carrito" });
    }
});

module.exports = router;
