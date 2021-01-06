import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Article from "../components/Article";
import Banner from "../components/Banner";
import Feature from "../components/feature";
import chemestry from "../components/img/chemistry.svg";
import competence from "../components/img/competence.svg";
import metals from "../components/img/three-dimensional.svg";
import biological from "../components/img/biological.svg";
import ladrillo from "../components/img/ladrillos.svg";
import Rocket from '../components/img/rocket.jpg'
import "../styles/home.css";
import { clienteAxios } from "../config/axios";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const blogsOfMonth = blogs.slice(-7).reverse();

  useEffect(() => {
    try {
      const consultarAPI = async () => {
        const blogConsulta = await clienteAxios.get("/blog");
        setBlogs(blogConsulta.data);
      };
      consultarAPI();
    } catch (error) {
      //Error con autorizacion
      console.log("Entre en un error de axios");
      if (error.response.status === 500) {
      }
    }
  }, []);

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
            {blogs.length > 0 ? (
              blogsOfMonth.map((article) => (
                <Article article={article} key={article._id} />
              ))
            ) : (
              <div className="Single-article">
                <div>Publicaremos próximamente</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="section-publicity">
        <h1 className="title">
          {" "}
          Ayudanos a construir la mejor comunidad de Ingeniería de Materiales
        </h1>
        <div className="line"></div>
        <div className="publicity-content">
          <div className="publicity-one">
            <div className="mini-cart">
              <div className="testimonial">
                <div className="img-rocket">
                  <img src={Rocket} alt="Ingeniero" />
                </div>
                <span>
 
                </span>
              </div>
              <p className="mission">Nuestro objetivo es dar a conocer esta increíble carrera</p>
            </div>

            <div className="publicity-text">
              Te invitamos a publicar con nosotros <br />
              <p>
                Escríbenos a <a href="/">ingenieria.materiales@gmail.com</a>
              </p>
            </div>
          </div>
          <div className="publicity-two">
            <p>Te invitamos a publicar con nosotros</p>
            <br />
            {/* <strong>Si tienes algo que contar como</strong> */}

            <ul className="list-request-publicity">
              <Feature color="#E8C921" text="Blogs 📕📒📔" />
              <Feature color="#BBA1FF" text="Artículos 📖📃📚" />
              <Feature
                color="#2490FC"
                text="¿Estuviste investigando algo de materiales? ¡Escríbenos!👨🏿‍🏭👷🏾‍♂️👩🏾‍💻"
              />
              <Feature
                color="#E66CEF"
                text="¿Quieres contar algo de materiales? ¡Escríbenos! 💯🧑🏿‍🔬   "
              />
              <Feature
                color="#F97308"
                text="Conoces una oportunidad de trabajo para compartir. ¡Escríbenos! 🎁🎉⚡️"
              />
              <Feature
                color="#8FE160"
                text=" ¿Quieres compartir tu historia? ¡Escríbenos! 👏🏼👨🏻‍🏫✍🏻 "
              />
            </ul>
            <br />

            <p>
              Sumate a la la nueva generación de profesionales que vamos a
              cambiar la industria
            </p>
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
          <Link to={"/"}>
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
      <Footer />
    </div>
  );
};

export default Home;
