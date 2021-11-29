import * as React from "react";
import { annotate, annotationGroup } from "rough-notation";

const ServiceTextPlane = ({ locale }) => {
  const wordOne = React.useRef();
  const wordTwo = React.useRef();
  const wordThree = React.useRef();
  const wordFour = React.useRef();

  const annotateWord = (word, color) => {
    return annotate(word.current, {
      color,
      type: "highlight",
      multiline: true,

      iterations: 1,
    });
  };

  React.useEffect(() => {
    const ag = annotationGroup([
      annotateWord(wordOne, "#FDE68A"),
      annotateWord(wordTwo, "#BAE6FD"),
      annotateWord(wordThree, "#A7F3D0"),
      annotateWord(wordFour, "#C7D2FE"),
    ]);
    ag.show();
  }, []);

  return (
    <>
      <div className="service-container">
        {locale === "es-CO" ? (
          <div className="service-title">
            <h1 className="title one">¿Por qué un </h1>
            <h1 className="title two">software a la medida</h1>
            <h1 className="title three">es tu mejor opción?</h1>
          </div>
        ) : (
          <div className="service-title">
            <h1 className="title one">Why is</h1>
            <h1 className="title two">custom software your</h1>
            <h1 className="title three">best option?</h1>
          </div>
        )}
        {locale === "es-CO" ? (
          <p>
            {" "}
            Un software <b>estándar o “cerrado”</b> es un software genérico, con
            un costo más bajo, sin embargo, tiene muchas funciones que
            probablemente tu empresa no requiera y por ende, no vayas a
            utilizar.
            <br /> <br />
            Un <b>software a la medida, </b> se adapta a tu tipo de empresa y
            los procesos que ya funcionan, incluso si ya existe un sistema
            implementado. Porque se lleva a cabo un proceso de análisis y
            estudio de tus necesidades para que tu software se pueda{" "}
            <span ref={wordOne}>desarrollar,</span>{" "}
            <span ref={wordTwo}>crear,</span>
            <span ref={wordThree}>implementar</span> u{" "}
            <span ref={wordFour}>optimizar</span>. Básicamente, lo que tienes en
            tu mente, lo llevamos a la realidad.
          </p>
        ) : (
          <p>
            A <b>standard or "closed" </b> software is generic, with a lower cost. 
            However, it has many functions that your company probably does not require, and therefore, 
            you will not use.
            <br /> <br />

            Among many other reasons, <b>custom software</b> adapts to your type of company, 
            the processes that already work, even if exists an implemented system. 

            A complete analysis process is conducted, and research of your needs
            to 
            <span ref={wordOne}>develop,</span>
            <span ref={wordTwo}>create,</span>
            <span ref={wordThree}>implement,</span> and
            <span ref={wordFour}>optimize,</span> software. In summary,
            what is on your mind, we lead it to reality
          </p>
        )}
      </div>

      <style jsx>{`
        .service-container {
          min-height: 30rem;
          max-width: 64rem;
          margin: auto;
          background-image: linear-gradient(
              to right bottom,
              rgba(0, 0, 0, 0),
              rgba(255, 255, 255, 1)
            ),
            url("/bg-rayas.svg");
          background-size: contain;
          background-repeat: no-repeat;
          background-position: right;
          padding: 2rem;
          color: black;
        }

        span {
          display: inline-block;
          margin: 0 10px;
        }

        .service-title {
          max-width: 60rem;
          width: 100%;
          margin-bottom: 2rem;
        }

        .title {
          color: #afd342;
          font-size: 3rem;
        }

        .two {
          text-align: center;
        }

        .three {
          text-align: end;
        }

        p {
          text-align: justify;
          line-height: 1.5;
          -webkit-columns: 25rem 2;
          -moz-columns: 25rem 2;
          columns: 25rem 2;
          -webkit-column-gap: 40px;
          -moz-column-gap: 40px;
          column-gap: 40px;
          font-family: "Lexend Exa", sans-serif;
        }

        @media (max-width: 540px) {
          .service-container {
            padding: 2rem;
          }
        }
      `}</style>
    </>
  );
};

export default ServiceTextPlane;
