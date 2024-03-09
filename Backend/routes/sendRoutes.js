const express = require("express");
const authRequired = require("../middlewares/validateToken");
const CartItem = require("../models/CartItem");
const User = require("../models/User");
const Order = require('../models/Order');

const router = express.Router();

router.get("/checkout", authRequired, async (req, res) => {
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
      totalAmount: totalAmount,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al obtener los datos del usuario y el carrito" });
  }
});

router.post("/place-order", authRequired, async (req, res) => {
  try {
    const { userData, cartItems, totalAmount } = req.body;
    const userId = req.user.id;

    if (cartItems.length === 0 || totalAmount === 0) {
      return res.status(400).json({ message: "El carrito está vacío" });
    }

    const newOrder = new Order({
      user: userId,
      userData: userData,
      cartItems: cartItems,
      totalAmount: totalAmount,
      status: "Confirmed",
      createdAt: new Date(),
    });

    await newOrder.save();

    await CartItem.deleteMany({ userId: userId });

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Error placing order" });
  }
});


router.get('/confirmed-orders', async (req, res) => {
  try {
    const confirmedOrders = await Order.find({ status: 'Confirmed' });
    res.status(200).json(confirmedOrders);
  } catch (error) {
    console.error('Error fetching confirmed orders:', error);
    res.status(500).json({ message: 'Error fetching confirmed orders' });
  }
});

router.delete('/orders/:orderId', authRequired, async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully', order: deletedOrder });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Error deleting order' });
  }
});


module.exports = router;
