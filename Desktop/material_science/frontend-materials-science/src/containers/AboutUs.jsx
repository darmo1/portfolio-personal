import React from "react";
import Banner from "../components/Banner";
import Footer from '../components/Footer'
import "../styles/aboutus.css";


const AboutUs = () => {
  return (
    <div className="AboutUs">
     <Banner />
      <div className="container-aboutUs">
       

        <h1 className="title-aboutUs">About Us</h1>
        <p className="text-aboutUs">
          Somos un grupo de ingenieros de materiales apasionado por la ciencia de
          materiales. 🤩🤩 <br />
          Queremos llevar la ciencia de materiales al siguiente nivel 🚀🚀. Queremos llevar la ciencia de materiales a todo el mundo 🌎. <br />
          Dar a conocer esta ciencia y crear colaboraciones de talla mundial con
          talento local ✨✨. Queremos crear comunidades colaborativas ❤️ llevar a los diferentes
          sectores generando soluciones y creando conocimientos 🤓🤓.<br/>
          Queremos dignificar la ingeniería 🤑🤑 porque creemos que a través de los materiales
          y la tecnología podemos hacer crecer nuestra industria 📈📈 queremos crear los
          protagonistas del futuro 🤘🤘. Sentimos que el futuro está en la ciencia 🔬🧪 y
          la tecnología 👨‍💻🤖 y los profesionales que hagan onboarding en
        </p>
        <ul className="list-aboutUs">
            <li className="item-aboutUs">Biotecnología</li>
            <li className="item-aboutUs">Nanotencología</li>
            <li className="item-aboutUs">Robótica</li>
            <li className="item-aboutUs">Ciencia aeroespacial</li>
            <li className="item-aboutUs">Ciencia de Materiales</li>
            <li className="item-aboutUs">Desarrollo de software</li>
          </ul>
          
          <p className="text-aboutUs">serán los rockstart 🔥🔥 de la industria.</p>
          <blockquote className="quote-aboutUs">
            El futuro lo podemos construir juntos. ✌️ <br />
            El futuro está en nuestras manos 👏👏
          </blockquote>
        <h1 className="line"> </h1>
        <h1 className="title-aboutUs"> Contáctanos </h1>
        <p>
          {" "}
          <span>Email:</span> <span>materiales@materiales.com</span>{" "}
        </p>
      </div>
    <Footer />
    <br />
    <br />
    <br />
    </div>
  );
};

export default AboutUs;
