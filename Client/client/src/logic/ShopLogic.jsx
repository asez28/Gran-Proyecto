import { useState } from "react";
import axios from "../api/axios";

export const addCarrito = (product, carritoObjeto, setCarritoObjeto) => {
  const existingProductIndex = carritoObjeto.findIndex(
    (item) => item.id === product.id
  );

  if (existingProductIndex !== -1) {
    const updatedCarrito = carritoObjeto.map((item) => {
      if (item.id === product.id) {
        return {
          ...item,
          cantidad: item.cantidad + 1,
          price: item.price + product.price,
        };
      }
      return item;
    });
    setCarritoObjeto(updatedCarrito);
    sentDatosBackend(updatedCarrito);
  } else {
    const newCarrito = [
      ...carritoObjeto,
      {
        ...product,
        cantidad: 1,
        price: product.price * 1,
      },
    ];
    setCarritoObjeto(newCarrito);
    sentDatosBackend(newCarrito);
  }
};

const sentDatosBackend = (carrito) => {
  axios
    .post("/add-to-cart", { carrito })
    .then((response) => {
    })
    .catch((error) => {
      console.error(error);
    });
};

export const increaseQuantity = async (
  productName,
  carritoObjeto,
  setCarritoObjeto
) => {
  try {
    const response = await axios.put(`/increase-cantidad/${productName}`);
    console.log(response.data);

    const updatedCarrito = carritoObjeto.map((item) => {
      if (item.title === productName) {
        return {
          ...item,
          cantidad: item.cantidad + 1,
          price: item.price + item.basePrice, // Actualiza el precio sumando el precio base al precio actual
        };
      }
      return item;
    });
    setCarritoObjeto(updatedCarrito);
  } catch (error) {
    console.error("Error increasing quantity:", error);
  }
};

export const decreaseQuantity = async (
  productName,
  carritoObjeto,
  setCarritoObjeto
) => {
  try {
    const response = await axios.delete(`/decrease-cantidad/${productName}`);

    const updatedCarrito = carritoObjeto
      .map((item) => {
        if (item.title === productName) {
          const newCantidad = Math.max(item.cantidad - 1, 0);
          if (newCantidad === 0) {
            return null;
          } else {
            return {
              ...item,
              cantidad: newCantidad,
              price: item.price - item.basePrice,
            };
          }
        }
        return item;
      })
      .filter((item) => item !== null);

    setCarritoObjeto(updatedCarrito);
  } catch (error) {
    console.error("Error decreasing quantity:", error);
  }
};


export const btnClean = async (setCarritoObjeto) => {
    try {
        await axios.delete('/delete-cart'); 
        setCarritoObjeto([]);
    } catch (error) {
        console.error('Error al limpiar el carrito:', error);
    }
};

