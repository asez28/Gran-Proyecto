import axios from "../api/axios";
import React, { useEffect } from "react";

export const drawShop = (
    carritoObjeto,
    increaseQuantity,
    decreaseQuantity,
    setCarritoObjeto
  ) => {

    return carritoObjeto.map((item) => (
      <div key={item.id}>
        <li
          className="list-group-item d-flex justify-content-between align-items-center border border-info"
          style={{ backgroundColor: "rgb(47, 47, 47)", height: "125px", borderRadius: "12px" }}
        >
          <img width="80" className="m-4" src={item.thumbnailUrl} alt="producto" />
          <span
            className="lead text-white"
            style={{ fontSize: "40px", fontFamily: "Exo', sans-serif" }}
          >
            {item.title}
          </span>
          <span style={{ fontSize: "60px", margin: "25px" }}>🛒 {item.cantidad}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center text-white border border-info" style={{backgroundColor: "rgba(0, 0, 0, 0.650)", backdropFilter: "blur(5px)", borderRadius: "12px"}}>
        <p className="price">₪ {item.price}</p>
        <button
          className="CartBtn"
          onClick={() =>
            increaseQuantity(item.title, carritoObjeto, setCarritoObjeto)
          }
        >
          <span className="IconContainer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 576 512"
              fill="rgb(17, 17, 17)"
              className="cart"
            >
              <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
            </svg>
          </span>
          <p className="text1">Add Item +</p>
        </button>
        <button
          className="deleteitem"
          onClick={() =>
            decreaseQuantity(item.title, carritoObjeto, setCarritoObjeto)
          }>
          <span className="text2">Delete Item</span>
          <span className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
            </svg>
          </span>
        </button>
        </li>
      </div>
    ));
  };