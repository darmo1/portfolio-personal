import React from "react";
import { Link } from "react-router-dom";
import "../styles/footer.css";

const Footer = () => {
  return (
    <div className="Footer">
      <div className="Footer-top">
        <div className="Footer-credits">
          <div>
            <p className="hack">
              Una website de ingenieros de materiales &#128119; para el mundo
              &#127758;{" "}
            </p>
            <p className="hack">
              🚀🚀 Ayudanos a crear la mejor comunidad de ingeniería 🚀🚀 
            </p>
            <p className="hack">🟢
              Tenemos como objetivo dar a conocer ingeniería de materiales y
              crear contenido con talento local <br />y generar colaboracion
              de talla mundial ✔️✔️{" "}</p>

            <p className="hack">
              {" "}
              Soluciones unicas e innovadoras con ayuda de la tecnología
              &#128079;&#128079;{" "}
            </p>
          </div>
        </div>
        <div className="Footer-aid">
        <h2>Contáctanos en </h2>
          <p>materiales@materiales.com</p>
        <h2> Lineas de énfasis 😎😍</h2>
          <ul className="Footer-aid-unorderList">
            <li className="hack list">Cerámicos</li>
            <li className="hack list ">Compuestos</li>
            <li className="hack list ">Metales</li>
            <li className="hack list">Polimeros</li>
            <li className="hack list">Tech </li>
          </ul>
          <div className="Footer-suscription">
        <span>Suscribete a nuestra base de datos</span>
        <input type="email" placeholder="email " />
        <button type="button">suscription</button>
      </div>

        </div>
        <div className="Footer-announce">
          
        </div>
      </div>

     
      <div className="Footer-links">
        <ul>
          <Link className="footer-list">
            <li>FAQ</li>
          </Link>
          <Link className="footer-list">
            <li>Contáctanos</li>
          </Link>
          <Link className="footer-list">
            <li>Términos y Condiciones</li>
          </Link>
          <Link className="footer-list">
            <li>Privacidad</li>
          </Link>
        </ul>
        <span>Hecho con &#128154; para el mundo</span>
      </div>
    </div>
  );
};

export default Footer;
