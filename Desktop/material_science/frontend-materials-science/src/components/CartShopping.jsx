import React, { useContext } from "react";
import {Link} from "react-router-dom";
import AppContext from "../context/AppContext";
import "../styles/cartShopping.css";

const CartShopping = () => {
  const { state } = useContext(AppContext);
  const { cart } = state;

  return (
    <div className="Nav-cart">
      <h1 className="title-tienda"> Tienda Online para ingenieros </h1>
      {cart.length > 0 && (
        <Link to={"/tienda/information"}>
          <div className="cart-shop">
            <span>Pagar</span>{" "}
            <i className="fas fa-shopping-basket button-shop" />
            {cart.length}
          </div>
        </Link>
      )}
    </div>
  );
};

export default CartShopping;
