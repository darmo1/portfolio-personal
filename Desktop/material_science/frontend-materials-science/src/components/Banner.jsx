import React from "react";
import { Link } from "react-router-dom";
import "../styles/banner.css";

const Banner = () => {
  return (
    <div className="message">
      <Link to={"/tienda"}>
        <div className="car-shop">
          <div>
            Visita nuestra tienda Online <i className="fas fa-shopping-cart" />
          </div>{" "}
          <br />
          <span className="car-title">
            ¡Seguro, encontrarás cosas Geniales!
          </span>
        </div>
      </Link>

      {/* <div className="banner-center">
        <span>Ayudanos a crecer, donación voluntaria</span>{" "}
        <button>Paypal</button>
      </div> */}

      <div className="banner-end">
        Agradecemos tu aporte. 😊😊 
        🚀Esta misión es de todo🚀{" "}
      </div>
    </div>
  );
};

export default Banner;
