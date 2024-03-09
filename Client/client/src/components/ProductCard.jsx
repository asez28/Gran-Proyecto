import React from "react";

function ProductCard({ id, title, thumbnailUrl, price, onAddToCart, video }) {
  return (
    <div
      className="col product-card card align-items-center mb-3 p-2"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0)",
        backdropFilter: "blur(5px)",
        boxShadow: "8px 11px 22px 0px rgba(0,0,0,0.75)",
      }}
    >
      <link rel="stylesheet" type="text/css" href="/CSS/button.css" />
      <h5>{title}</h5>
      <img
        src={thumbnailUrl}
        alt={title}
        style={{ width: "200px", borderRadius: "15px" }}
      />
      <p className="price">₪{price}</p>

      <button className="btn1" onClick={onAddToCart}>
        <strong>Add to the Cart</strong>
        <div id="container-stars">
          <div id="stars"></div>
        </div>
        <div id="glow">
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
      </button>
      <iframe
      style={{boxShadow:"8px 11px 22px 0px rgba(24,24,122,1)", borderRadius:"25px", margin: "10px"}}
        width="270"
        height="200"
        src={video}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </div>
  );
}

export default ProductCard;

// <iframe  src={video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
