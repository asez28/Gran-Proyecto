import React, { useState, useEffect } from "react";
import { addCarrito, drawTotal, decreaseQuantity, increaseQuantity, btnClean } from '../logic/ShopLogic';
import { drawShop } from "../logic/DrawShop";
import ProductCard from '../components/ProductCard';
import axios from "../api/axios";

function Shop() {
  const [carritoObjeto, setCarritoObjeto] = useState([]);   
  const [products, setProducts] = useState([]);

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

  return (
    <div style={{
      backgroundImage: "url('/IMG/harley_quinn_4k_hd_gotham_knights.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }} >
      <link rel="stylesheet" type="text/css" href="/CSS/shop.css" />
      <div className="container" >
        <div className="row">
          {products.map(product => (
            <div key={product.id} className="col-md-4">
              <ProductCard
                title={product.title}
                price={product.price}
                videoSrc={product.video}
                thumbnailUrl={product.thumbnailUrl}
                onAddToCart={() => addCarrito(product, carritoObjeto, setCarritoObjeto)}
              />
            </div>
          ))}
        </div>
        
        <div id="carrito">
          <h3>Carrito</h3>
          {drawShop(carritoObjeto, increaseQuantity, decreaseQuantity, setCarritoObjeto)}
          {drawTotal(carritoObjeto)}
          <button onClick={() => btnClean(setCarritoObjeto)}>Limpiar Carrito</button>
        </div>
      </div>
    </div>
  );
};

export default Shop;
