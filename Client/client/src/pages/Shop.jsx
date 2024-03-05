import React, { useState, useEffect } from "react";
import { addCarrito, decreaseQuantity, increaseQuantity, btnClean } from '../logic/ShopLogic';
import { drawShop } from "../logic/DrawShop";
import { drawTotal, drawCantidadTotal } from "../logic/drawTotal";
import ProductCard from '../components/ProductCard';
import axios from "../api/axios";
import { Link } from "react-router-dom";

function Shop() {
  const [carritoObjeto, setCarritoObjeto] = useState([]);   
  const [products, setProducts] = useState([]);
  const cantidadTotal = drawCantidadTotal(carritoObjeto);

  useEffect(() => {
    fetchData();
    fetchCartItems(); 
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('./JS/SHOP.json');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('/get-card-item');
      setCarritoObjeto(response.data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const scrollToCarrito = () => {
    const carritoContainer = document.getElementById('carrito');
    if (carritoContainer) {
      carritoContainer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{
      backgroundImage: "url('/IMG/harley_quinn_4k_hd_gotham_knights.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }} >
      <link rel="stylesheet" type="text/css" href="/CSS/shop.css" />
      <link rel="stylesheet" type="text/css" href="/CSS/deletebtn.css" />
      <div className="container" >
        <div className="row">
          {products.map(product => (
            <div key={product.id} className="col-md-4">
              <ProductCard
                title={product.title}
                price={product.price}
                videoSrc={product.video}
                thumbnailUrl={product.thumbnailUrl}
                onAddToCart={() => {
                  addCarrito(product, carritoObjeto, setCarritoObjeto);
                  scrollToCarrito();
                }}
              />
            </div>
          ))}
        </div>
        
        <div id="carrito">
          <h3>Carrito</h3>
          {drawShop(carritoObjeto, increaseQuantity, decreaseQuantity, setCarritoObjeto)}
          </div>
          <div className="card text-white mt-4" style={{backgroundColor: "rgba(0, 0, 0, 0.400)", backdropFilter: "blur(5px)"}}>
          <div className="card-body d-flex justify-content-between align-items-center">
          {drawTotal(carritoObjeto)}
           <h3 style={{fontSize: "30px", fontFamily: "Nova Square, cursive"}}>Items: {cantidadTotal}</h3>
           <Link className="btn btn-outline-success btn-rounded" to="/checkout">Checkout 🏍️</Link>
          <button onClick={() => btnClean(setCarritoObjeto)} className="deletebutton" type="button">
  <span className="button__text">Clean Cart</span>
  <span className="button__icon">
    <svg className="svg" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg">
      <title></title>
      <path d="M112,112l20,320c.95,18.49,14.4,32,32,32H348c17.67,0,30.87-13.51,32-32l20-320" style={{ fill: "none", stroke: "#fff", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32px" }}></path>
      <line style={{ stroke: "#fff", strokeLinecap: "round", strokeMiterlimit: "10", strokeWidth: "32px" }} x1="80" x2="432" y1="112" y2="112"></line>
      <path d="M192,112V72h0a23.93,23.93,0,0,1,24-24h80a23.93,23.93,0,0,1,24,24h0v40" style={{ fill: "none", stroke: "#fff", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32px" }}></path>
      <line style={{ fill: "none", stroke: "#fff", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32px" }} x1="256" x2="256" y1="176" y2="400"></line>
      <line style={{ fill: "none", stroke: "#fff", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32px" }} x1="184" x2="192" y1="176" y2="400"></line>
      <line style={{ fill: "none", stroke: "#fff", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32px" }} x1="328" x2="320" y1="176" y2="400"></line>
    </svg>
  </span>
</button>
     </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
