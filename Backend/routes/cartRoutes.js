const express = require("express");
const authRequired = require("../middlewares/validateToken");
const router = express.Router();
const CartItem = require("../models/CartItem");

router.get("/buycar", authRequired, (req, res) => res.send("shoping"));

router.post("/add-to-cart", authRequired, async (req, res) => {
  try {
    const { carrito } = req.body; 
    const userId = req.user.id;

    for (const item of carrito) { 
      const { id, cantidad, title, price, basePrice, thumbnailUrl } = item; 

      let cartItem = await CartItem.findOne({ userId, id });

      if (cartItem) {
        cartItem.cantidad = parseInt(cantidad);
        cartItem.price = parseInt(price);
      } else {
        cartItem = new CartItem({
          userId: userId,
          id: id,
          title: title,
          cantidad: parseInt(cantidad),
          price: parseInt(price),
          basePrice: basePrice,
          thumbnailUrl: thumbnailUrl
        });
      }

      await cartItem.save();
    }

    res.status(200).json({
      message: "Productos agregados al carrito correctamente",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al agregar los productos al carrito" });
  }
});

router.get("/get-card-item", authRequired, async (req, res) => {
  const cardsItems = await CartItem.find();
  res.json(cardsItems);
});

router.delete(
  "/decrease-cantidad/:title",
  authRequired,
  async (req, res) => {
    try {
      const title = req.params.title;
      const userId = req.user.id;

      let cartItem = await CartItem.findOne({
        title: title,
        userId: userId,
      });

      if (!cartItem) {
        return res
          .status(404)
          .json({ message: "No se encontró el artículo en el carrito" });
      }

      if (cartItem.cantidad === 1) {
        await CartItem.findOneAndDelete({
          title: title,
          userId: userId,
        });
      } else {
        cartItem.cantidad -= 1;

        cartItem.price -= cartItem.basePrice;

        await cartItem.save();
      }

      res.status(200).json({
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
  "/increase-cantidad/:title",
  authRequired,
  async (req, res) => {
    try {
      const title = req.params.title;
      const userId = req.user.id;

      let cartItem = await CartItem.findOne({
        title: title,
        userId: userId,
      });

      if (!cartItem) {
        return res
          .status(404)
          .json({ message: "No se encontró el artículo en el carrito" });
      }

      cartItem.cantidad += 1;
      cartItem.price += cartItem.basePrice;

      await cartItem.save();

      res.status(200).json({
        message: "Se ha aumentado la cantidad del producto en el carrito",
        cartItem: cartItem,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error al aumentar la cantidad del artículo en el carrito",
      });
    }
  }
);


module.exports = router;
