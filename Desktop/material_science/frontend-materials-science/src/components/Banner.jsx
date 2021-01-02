import React from "react";
import "../styles/banner.css";

const Banner = () => {
  return (
    <div className="message">
     
        <div className="car-shop">
         <div>Visita nuestra tienda Online <i class="fas fa-shopping-cart" /></div> <br />
         <span className="car-title">¡Seguro, encontrarás cosas Geniales!</span>
       
        </div>
   

      <div className="banner-center">
        <span>Ayudanos a crecer, donación voluntaria</span>{" "}
        <button>Paypal</button>
        
      </div>

      <div className="banner-end">
        Agradecemos tu aporte. 😊😊 <br />
        🚀Esta misión es de todo🚀{" "}
      </div>
    </div>
  );
};

export default Banner;
