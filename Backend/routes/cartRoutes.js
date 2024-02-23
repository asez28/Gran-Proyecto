const express = require("express");
const authRequired = require("../middlewares/validateToken");
const router = express.Router();
const CartItem = require("../models/CartItem");

router.get("/buycar", authRequired, (req, res) => res.send("shoping"));

router.post("/add-to-cart", authRequired, async (req, res) => {
  try {
    const { productId, quantity, productName, price, basePrice } = req.body;
    const userId = req.user.id;

    let cartItem = await CartItem.findOne({ userId, productId });

    if (cartItem) {
      cartItem.quantity += parseInt(quantity);
      cartItem.price += parseInt(price);
    } else {
      cartItem = new CartItem({
        userId: userId,
        productId: productId,
        productName: productName,
        quantity: parseInt(quantity),
        price: parseInt(price),
        basePrice: basePrice,
      });
    }

    await cartItem.save();

    res
      .status(200)
      .json({
        message: "Producto agregado al carrito correctamente",
        cartItem: cartItem,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al agregar el producto al carrito" });
  }
});

router.get("/get-card-item", authRequired, async (req, res) => {
  const cardsItems = await CartItem.find();
  res.json(cardsItems);
});

router.delete(
  "/remove-from-cart/:productName",
  authRequired,
  async (req, res) => {
    try {
      const productName = req.params.productName;
      const userId = req.user.id;

      let cartItem = await CartItem.findOne({
        productName: productName,
        userId: userId,
      });

      if (!cartItem) {
        return res
          .status(404)
          .json({ message: "No se encontró el artículo en el carrito" });
      }

      if (cartItem.quantity === 1) {
        await CartItem.findOneAndDelete({
          productName: productName,
          userId: userId,
        });
      } else {
        cartItem.quantity -= 1;

        cartItem.price -= cartItem.basePrice;

        await cartItem.save();
      }

      res
        .status(200)
        .json({
          message: "Se ha eliminado una unidad del producto del carrito",
          cartItem: cartItem,
        });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error al eliminar el artículo del carrito" });
    }
  }
);

router.put(
  "/increase-quantity/:productName",
  authRequired,
  async (req, res) => {
    try {
      const productName = req.params.productName;
      const userId = req.user.id;

      let cartItem = await CartItem.findOne({
        productName: productName,
        userId: userId,
      });

      if (!cartItem) {
        return res
          .status(404)
          .json({ message: "No se encontró el artículo en el carrito" });
      }

      cartItem.quantity += 1;
      cartItem.price += cartItem.basePrice; 

      await cartItem.save();

      res
        .status(200)
        .json({
          message: "Se ha aumentado la cantidad del producto en el carrito",
          cartItem: cartItem,
        });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          message: "Error al aumentar la cantidad del artículo en el carrito",
        });
    }
  }
);

router.put(
  "/decrease-quantity/:productName",
  authRequired,
  async (req, res) => {
    try {
      const productName = req.params.productName;
      const userId = req.user.id;

      let cartItem = await CartItem.findOne({
        productName: productName,
        userId: userId,
      });

      if (!cartItem) {
        return res
          .status(404)
          .json({ message: "No se encontró el artículo en el carrito" });
      }

      if (cartItem.quantity === 1) {
        return res
          .status(400)
          .json({ message: "La cantidad mínima permitida es 1" });
      }

      cartItem.quantity -= 1;
      cartItem.price -= cartItem.basePrice; 

      await cartItem.save();

      res
        .status(200)
        .json({
          message: "Se ha reducido la cantidad del producto en el carrito",
          cartItem: cartItem,
        });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          message: "Error al reducir la cantidad del artículo en el carrito",
        });
    }
  }
);

module.exports = router;
