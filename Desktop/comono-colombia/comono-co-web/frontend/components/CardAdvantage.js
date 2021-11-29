import React from 'react'
import { urlFor } from '../lib/sanity'

const CardAdvantage = ({advantageItem}) => {

    const { description, image, order, title } = advantageItem;
    
    return (
        <>
        <div className="card-container">
            <div className="card-photo">
                <img src={urlFor(image).url()} alt="photo" className="service-advantage-pic"/>
            </div>
            <div className="card-info">
                <div className="card-number">{order}</div>
                <div className="card-title">{title}</div>
                <div className="card-excerpt">{description}</div>
            </div>
            
        </div>

        <style jsx>{`
            .card-container{
                width:350px;
                font-family:'Lexend Exa', sans-serif;
                padding: 1.2rem;
                margin:2rem 1rem 1rem .2rem;
               
            }
            .card-photo{
                height:55%;
                width:100%;
                width:inherit;
                border-radius: 12px;
                
                transform: rotate(-1deg);

            }

            .card-info{
                position:relative;
            }

            .card-number{
                position:absolute;
                top:-80px;
                left:20px;
                font-size: 7rem;
                color: lightblue;
               
                
            }

            .card-number::before{
                content:"";
                position:absolute;
                top:60%;
                left:0;
                height:1px;
                width: 50px;
                background: black;
                z-index:2;
            }

            .card-title{
                text-align:center;
                margin: 1rem auto 2rem auto;
                margin-left: 5rem;
                font-size:0.8rem;
                font-weight: bold;
            }

            .card-excerpt{
                margin: 1rem 1rem 0 2rem;
                font-size:0.8rem;
            }

            .service-advantage-pic{
                width: 100%;
                height: 100%;
            }

            @media(max-width: 540px){
                .card-container{
                width:250px;
                }
            }
        
        `}</style>
        </>
    )
}

export default CardAdvantage
