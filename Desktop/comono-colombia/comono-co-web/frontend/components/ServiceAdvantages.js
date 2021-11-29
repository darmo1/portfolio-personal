import React from 'react'
import CardAdvantage from './CardAdvantage'

const ServiceAdvantages = ({ advantages, locale }) => {

    const { serviceAdvantage } = advantages;

    return (
        <>
        <div className="title">
          <h1>{locale === "es-CO" ? 'Las ventajas son inmensas,' : 'The benefits are vast'} </h1>
          <h4>{locale === "es-CO" ? 'Una de las mas significativas es que las soluciones en la nube te permiten:' : 'The most significant are cloud-based solutions that allow you to:'} </h4>
        </div>
       
        <section className="service-advantage-container  d-flex">
           { (serviceAdvantage && serviceAdvantage.legth != 0) ? serviceAdvantage.map( ( advantageItem, index) => {
             return (  <CardAdvantage key={index} advantageItem={advantageItem}/> )
           })
            : 'Cargando...'
          }
        </section>

      <style jsx>{`
        .title{
            position:relative;
            margin-left: 5rem;
        }

        .title:before{
            content:"";
            width: 5vw;
            max-width: 4rem;
            height: 30px;
            background: #7FD9E3;
            position:absolute;
            top:0;
            left:-5rem;
        }

        h1{
          font-size:2rem;
        }
        h4{
          font-size: 0.9rem;
        }

        .service-advantage-container{
          margin-left:1rem;
          overflow-x: scroll;
          width:100%;
          
        }

        @media(max-width: 540px){

          
            h1 , h4 {
              width: 90%;
            }
            h1{
              font-size:1rem;
            }
            h4{
              font-size:0.85rem;
            }
          
        }
      
      `}</style>
            
        </>
    )
}

export default ServiceAdvantages
