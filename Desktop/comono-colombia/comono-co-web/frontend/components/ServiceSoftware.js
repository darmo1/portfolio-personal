import React from "react";
import { useWindowSize } from "../hooks/useWindowSize";
import EN from "../utils/EN";
import ES from "../utils/ES";


const ServiceSoftware = ({locale}) => {

  const windowSize = useWindowSize();

  const data = locale === "es-CO" ? ES.service.section : EN.service.section ;





  return (
    <>
      <div className="container d-flex">
        <div className="vs"></div>
        <div className="container-standard-soft d-flex">
          <h1>{data.standardSoftware.title}</h1>
        </div>
        <div className="container-custom-soft">
          <div className="container-img">
            
           { windowSize.width > 540 ? <img alt="custom-soft" src="/apple-fit.png"/> : null }
            
            
            
          </div>
          <div className="custom-soft">
            <h1>{data.customSoftware.title}</h1>
            <p>
              {data.customSoftware.text}
            </p>
         
           
          </div>
        </div>
          { windowSize.width < 540 ? <img className="custom-soft-img" alt="custom-soft" src="/apple-fit.png"/> : null }
        
      </div>
      <style jsx>{`
        .container {
            padding:2rem;
            position:relative;
            margin:auto;
            justify-content:center;
            max-width:64rem;
            justify-content: space-between;
            
           
        }

        .container-standard-soft,
        .container-custom-soft {
          width: 50%;
          max-width: 32rem;
        }

        .container-standard-soft{
          background-image: linear-gradient(
            to right bottom,
            rgba(255,255,255,0.5),
            rgba(255,255,255,1)
          ),url('/bg-rayas.svg');
          background-size: contain;
          background-repeat: no-repeat;
         justify-content: center;
         align-items:center;
          color: black;
        }
        

        .container-custom-soft {
          width: 50%;
          max-width: 25rem;
        }

        .custom-soft{
            margin-top:2rem;
        }

         h1{
          font-size:2.5rem;
          margin-bottom: 2rem;
        }

        .custom-soft >  p{
          line-height: 1.5;
          font-family:'Lexend Exa', sans-serif;
        }

        .vs{
            position:absolute;
            top:50%;
            bottom:20%;
            right:50%;
            left:40%;
            margin:auto;
            
            height:150px;
            background-image: url('/against.svg');
            background-size: contain;
            background-position:center;
            background-repeat: no-repeat;
        }

        .container-img{
         height:auto;
         max-width:20rem;
         
         
        }
        .container-img img{
          width:100%;
        }
        @media(max-width: 540px){

          .container{
            flex-direction: column;
            align-items: center;
            position: relative;
          }
          .container-img{
            width: auto;
          }

          .container-standard-soft,
          .container-custom-soft{
   
            width: 100%;
            margin: 3rem auto;
          }

          .vs{
            position: absolute;
            width: 80px;
            left:40%;
            top:-30%;
            
            
          }

          .custom-soft-img{
            width:80%;
          }
        }
      `}</style>
    </>
  );
};

export default ServiceSoftware;
