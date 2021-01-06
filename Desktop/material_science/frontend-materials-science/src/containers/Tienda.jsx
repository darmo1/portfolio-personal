import React, { useContext } from "react";
import ProductoTienda from "../components/ProductoTienda";
import CartShopping from "../components/CartShopping";
import DateProduction from '../components/Timer'


import AppContext from "../context/AppContext";
import "../styles/tienda.css";

const Tienda = () => {
   const { state , addToCart } = useContext(AppContext)
   const {products} = state
  
  
  const handleAddToCart = product => () => {
    console.log('Este es el producto', product)
    addToCart(product)
  }

  return (
    <>
     <DateProduction />
      <CartShopping />
      <div className="Tienda">
  
       {products.map( product => (
        <ProductoTienda  
          product={ product} 
          key={product.id} 
          handleAddToCart={handleAddToCart} 

          />
       ))}
        
      </div>
      <div className="statement">
        <p>Tienda de regalos para ingenieros </p>
          <p>Todos los derechos reservados 2021</p>
      </div>
    </>
  );
};

export default Tienda;
