import * as React from "react";
import Aos from 'aos';
import "aos/dist/aos.css"
import { useWindowSize } from "../hooks/useWindowSize";
import { PortableText, urlFor } from "../lib/sanity";

const ServiceDigital = ({
  borderRadius = "22%",
  minHeight = "65vh",
  minWidth = "25rem",
  background = "#C6ED88",
  rotate = "60deg",
  marginLeft = "0",
  word,
  info,
  id 
}) => {

  

  const { serviceExtract } = info;
  const size = useWindowSize();
  React.useEffect(() => Aos.init( { duration:2000 } ), []);




  return (
    <>
      <section className="bg" id={id}>
        <div className="left-side">
          <div className="block" style={{background}}></div>
          <div className="service-title" data-aos="fade-right"> 
            <div  className="title-word  d-flex" style={{color: word?.color}}>{word?.servicename}</div>
          </div>
        </div>
        <div className="right-side" style={{background}} >
          <div className="service-container">
            <div
              className="service-shape"
              style={{
                borderRadius,
                minHeight: `${size.width > 540 ? minHeight : '50vh'}`,
                minWidth,
                transform: `rotate(${rotate})`,
                marginLeft,
              }}
            >
              <div
                className="service-info"
                style={{ transform: `rotate(-${rotate})` }}
                data-aos="fade-up-left"
                data-aos-duration="300"
               
              >
                <PortableText blocks={serviceExtract} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
      
        .bg {
          display:grid;
          grid-template-columns: repeat(auto-fit , minmax(16.87rem, 1fr));
          position: relative;
         
          margin: auto;
          
        }

        .left-side, 
        .right-side{
          display: grid;
        }

        .left-side{
          grid-template-columns: 20% auto;

        }

        .right-side {
         
        }

        .block {
          grid-column-start: 1;
          grid-column-end: 2;
          height: 30px;
          max-width: 4rem;
          background: black;
          align-self: center;
        }

        .service-title {
          grid-column-start: 2;
          grid-column-end: 3;
          display:flex;
          flex-direction: column;
          justify-content:center;
          height: 100%;

        }

        .title-word{
          font-family: 'Roboto', sans-serif;
          font-size: 4.5vw;
          font-weight:700;
          color: #04ACC5;
          margin: 1rem 0;
 
          max-width: 70%;
          margin:auto;
          text-align:center;
        }

        .service-container {
          grid-column-start: 1;
          grid-column-end: 2;
          min-height: 700px;
          display:flex;
          margin: auto 0;
          overflow:hidden;
          
        }

        .service-shape {
          background: white;
          max-width:32rem;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 0 0 1rem;
          position: relative;
        }

        .service-info {
          transform: rotate(-60deg);
          font-weight:200;
          line-height: 1.3;
          max-width: 70%;
          position: relative;
          font-family:'Lexend Exa', sans-serif;
          font-size:1rem;
        }

        .service-info::before {
          content: "";
          position: absolute;
          top: 2rem;
          left: -5rem;
          height: 3px;
          min-width: 4rem;
          background: black;
        }

        @media(max-width: 540px){
          .bg{
            display:flex;
            flex-wrap:wrap;
          }
          .left-side, 
          .right-side{
            min-height: 300px;
            width:100%;
          }

          .right-side{
          overflow: hidden;
        }

        .block{
          width: 5vw;
        }

        .service-container{
          min-height: auto;
        }

        .service-title{
          padding: 2rem;
          
        }

        .title-word{
          font-size: 3rem;
          font-weight: 700;
        }
        .one{
          top:20%;
        }
        .two{left:0;
          top:35%;

        }
        .three{
          top:53%;
        }
        .four{
          top:70%;
        }
        }

        @media (min-width: 540px) and (orientation: landscape) { 


         }

        



        }
      `}</style>
    </>
  );
};

export default ServiceDigital;
