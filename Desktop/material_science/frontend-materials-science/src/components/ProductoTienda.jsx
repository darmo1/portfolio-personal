import React from "react";

import "../styles/producto.css";

const ProductoTienda = ({ product, handleAddToCart }) => {
  return (
    <div className="Producto">
      <img className="img-product"  src={product.image} alt={product.title} />
      <div className="description-product">
        <h4 className="title-product">
          {product.title} <span>$ {product.price} USD</span>
        </h4>
        <p className="desc-product">{product.description}</p>
        
          <button 
          type="button" 
          className=" Button"
          onClick={handleAddToCart( product)}
          >
            {" "}
            Comprar <span>👈</span>
          </button>
       
      </div>
    </div>
  );
};

export default ProductoTienda;
