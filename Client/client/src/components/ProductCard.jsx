import React from "react";

function ProductCard({ title, thumbnailUrl, price, onAddToCart, video }) {
  return (
    <div
      className="col product-card card align-items-center  mb-3 p-2"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0)",
        backdropFilter: "blur(5px)",
      }}
    >
      <h5>{title}</h5>
      <img
        src={thumbnailUrl}
        alt={title}
        style={{ width: "200px", borderRadius: "15px" }}
      />
      <p className="price">Precio: {price}</p>
      <button onClick={onAddToCart}>Add to the Cart</button>
    </div>
  );
}

export default ProductCard;

// <iframe  src={video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
