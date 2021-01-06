import React, {useContext} from 'react'
import AppContext from '../context/AppContext'
import "../styles/success.css"

const Success = () => {

    const {state} = useContext(AppContext)
    const {buyer} = state


    return (
        <div className="Success">
            <div className="Success-content">
                <h2>{`${buyer.name}, Gracias por tu compra`}</h2>
                <span> 🤗 🤗Tu pedido llegará pronto a tu dirección 🤗 🤗 </span>
                <span> 💯💯 Tu pedido fue tomado 🧾 por nuestro personal 👨‍🏭👨‍🏭  y será despachado pronto 🛵🛵  </span>
                <span> Te enviaremos un email 📧 pronto 😉   </span>
                <div className="Success-map">
                     <h1>VUELVE </h1> 
                </div>
            </div>
        </div>
    )
}

export default Success
