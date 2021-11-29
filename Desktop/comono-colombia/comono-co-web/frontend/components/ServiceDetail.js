import * as React from "react";
import { PortableText, urlFor } from "../lib/sanity";
import Aos from "aos";
import "aos/dist/aos.css"

const ServiceDetail = ({ data, color}) => {

  const { serviceInfo } = data;
  React.useEffect( () => Aos.init({duration:2000}), [])

 React.useEffect(()=>{
  const h1 = document.querySelector(".service-container-text div h1")
  const h2 = document.querySelectorAll(".service-container-text div h2")
  const ul = document.querySelectorAll(".service-container-text div ul")
  
  ul.forEach( ul => {
    ul.style.marginBottom = '2rem'
    ul.setAttribute("data-aos", "fade-up")
  } )
  
  h2.forEach( h2 => {
    h2.style.fontSize = '2rem'
    h2.style.marginBottom = '2rem'
    h2.setAttribute("data-aos", "fade-up")
  })

  if(h1){
    h1.style.color = color
  h1.style.marginBottom = '2rem'
  h1.style.fontSize = '2rem'
  h1.setAttribute("data-aos", "fade-up")

  }
  
 }, [])

 
 
  return (
    <>
      <div className="service-container"  >
        {serviceInfo ? serviceInfo.map((item, index) =>
          item.description.length != 0 ? (
            <div className="service-container-mobile  d-flex" key={index}>
              <div className="service-container-info" style={item.order === 0 ? {order:1} : {order:2}}>
                <div className={(item.order === 0) ? 'order-one d-flex' : 'order-two d-flex'}>
                  <div className="block"  style={{ background: color}}></div>
                  <div className="service-container-text" data-aos="fade-right">
                    <PortableText blocks={item.description} key={item._key}  />
                  </div>
                </div>
              </div>

              <div className="service-container-image"  style={item.order === 0 ? {order:2} : {order:1, justifyContent:'flex-end'}} >
                <div className="image" >
                  <img   alt="Image" src={urlFor(item.image).url()}/>
                </div>
              </div>
            </div>
          ) : null
        ):
        null}
      </div>

      <style jsx>{`
        .service-container {
          
        }
        .service-container-info,
        .service-container-image {
          width: 50%;
          display: flex;
          
          margin: auto;
       
        }

        .order-one {
          width: 100%;
          justify-content: space-between;
        }
        .order-two {
          width: 100%;
          max-width: 32rem;
        }

        .block {
          width: 5vw;
          height: 30px;
          max-width: 4rem;
          align-self: center;
        }

        .service-container-text {
          max-width: 32rem;
          width: 100%;
          margin-right: 0;
          align-items: center;
          padding: 1.5rem;
          font-family: Lexend Exa Regular;

        }

       

        .image {
          max-width: 32rem;
          width: 100%;
        }

        .image > img {
          width: 100%;
          height: 100%;
        }

        @media(max-width: 540px){
          .service-container-info,
          .service-container-image {
            width: 100%;
            flex-wrap: wrap;
            }

            .service-container-mobile{
              width: 100%;
            flex-wrap: wrap;
            }

            .image {
               max-width: 100%;
                width: 100%;
        }
        .order-one {
         
          justify-content: space-evenly;
        }
        .order-two {
          width: 100%;
          max-width: 100%;
          
        }

        .service-container-text{
          max-width: 100%;
        }

        }
      `}</style>
    </>
  );
};

export default ServiceDetail;
