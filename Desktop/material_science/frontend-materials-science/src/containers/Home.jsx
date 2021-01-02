import React from "react";
import { Link } from "react-router-dom";
import data from "../example.js";
import Article from "../components/Article";
import Banner from "../components/Banner";

import chemestry from "../components/img/chemistry.svg";
import competence from "../components/img/competence.svg";
import metals from "../components/img/three-dimensional.svg";
import biological from "../components/img/biological.svg";
import ladrillo from "../components/img/ladrillos.svg";
import "../styles/home.css";

const Home = () => {
  return (
    <div className="Home">
      <Banner />
      <div className="lastBlogs">
        <h2 className="title"> Ultimos blogs </h2>
        <div className="line"></div>
        <div className="libreria">
          <div className="libreria-title">
            <h2>Blog de este mes</h2>
            <div>
              <p>
                Hecho por <br /> Ingenieros de materiales
              </p>
            </div>
          </div>
          <div className="articles">
            {data.articles.map((article) => (
              <Article article={article} key={article.id} />
            ))}
          </div>
        </div>
      </div>

      <div className="sponsor">
        <h2 className="title"> Nuestras lineas de interés </h2>
        <div className="line"></div>
        <div className="sponsor-img">
          <Link to={"/"}>
            <div>
              <img className="icon-sponsor" src={metals} alt="sponsor1" />
              <p>Metales</p>
            </div>{" "}
          </Link>
          <Link to={"/"}>
            <div>
              <img className="icon-sponsor" src={ladrillo} alt="sponsor2" />
              <p>Cerámicos</p>
            </div>
          </Link>
          <Link>
            <div>
              <img className="icon-sponsor" src={chemestry} alt="sponsor2" />
              <p>Polímeros</p>
            </div>{" "}
          </Link>
          <Link to={"/"}>
            <div>
              <img className="icon-sponsor" src={biological} alt="sponsor2" />
              <p>Compuestos</p>
            </div>{" "}
          </Link>
          <Link to={"/"}>
            <div>
              <img className="icon-sponsor" src={competence} alt="sponsor2" />
              <p>
                Habilidades <br /> competitivas
              </p>
            </div>{" "}
          </Link>
        </div>
      </div>

      <div className="section-publicity">
        <h1 className="title">
          {" "}
          Unete y ayudanos a construir la mejor comunidad de Ingeniería de
          Materiales
        </h1>
        <div className="publicity-content">
          <div className="publicity-one">
            <div className="mini-cart">
              <div className="testimonial">
                <span>
                  <img alt="Ingeniero" />
                </span>
                <span>
                  <div>Danilo Morales</div>
                  <a href="/">
                    <div> @twitter</div>
                  </a>
                </span>
              </div>
              <p>Nuestro objetivo es dar a conocer esta increíble carrera</p>
            </div>

            <p className="publicity-text">
              Te invitamos a publicar con nosotros <br />
              <p>
                Escribenos a <a href="/">materiales@materiales.com</a>
                <p>
                  {" "}
                  Sumate a la la nueva generación de profesionales que vamos a
                  cambiar la industria
                </p>
              </p>
            </p>
          </div>
          <div className="publicity-two">
            <p>Te invitamos a publicar con nosotros</p>
            <br />
            <strong>Si tienes algo que contar como</strong>

            <ul className="list-request-publicity">
              <li>blog </li>
              <li>articulos</li>
              <li> Si Estuviste investigando algo especifico de materiales </li>
              <li> Si quieres contar algo de materiales </li>
              <li>
                {" "}
                Conoces una oportunidad de trabajo para compartir con la
                comuninidad
              </li>
              <li>
                Quieres compartir tu historia con la ingenieria de materiales
              </li>
            </ul>
          </div>

          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
