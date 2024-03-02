import React, { useState, useEffect } from "react";
import { addCarrito, drawShop, drawTotal, btnIncreas, btnDecrease, btnClean } from '../logic/ShopLogic';
import ProductCard from '../components/ProductCard';

function Shop() {
  const [carritoObjeto, setCarritoObjeto] = useState([]);   
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const storedCarrito = localStorage.getItem('car');
    if (storedCarrito) {
      setCarritoObjeto(JSON.parse(storedCarrito));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('car', JSON.stringify(carritoObjeto));
  }, [carritoObjeto]);

  const fetchData = async () => {
    try {
      const res = await fetch('./JS/SHOP.json');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{
      backgroundImage: "url('/IMG/harley_quinn_4k_hd_gotham_knights.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }} >
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
        {drawShop(carritoObjeto, btnIncreas, btnDecrease)}
        {drawTotal(carritoObjeto)}
        <button onClick={() => btnClean(setCarritoObjeto)}>Limpiar Carrito</button>
      </div>
    </div>
    </div>
  );
};

export default Shop;
