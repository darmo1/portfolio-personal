import * as React from "react";
import Aos from 'aos'
import "aos/dist/aos.css"

const Banner = ({ text }) => {

  React.useEffect( () => {
    Aos.init({duration:2000})

  }, [])

  return (

    <section className="Hero">
      <div className="block"></div>
      <div className="background-text"> {text}
        <div data-aos="fade-right" className="banner-text"> {text} </div>
      </div>

      <div data-aos="fade-left" className="bg-pieces"></div>

      <style jsx>{`
          .Hero{
            display:grid;
            grid-template-columns:
              [full-start] minmax(0, 1fr)
              [first-main] minmax(0, 35rem)
              [second-main] minmax(0, 35rem)
              [thrid-main] minmax(1rem, 1fr)
              [full-end];
           
            width:100%;
            position: relative;
            background-color: #f4f4f4;
          }

          .block {
            grid-column: [full-start]/[first-main];
            max-width: 4rem;
            height: 3rem;
            background-color: #383838;
            margin-top: 150px;
          }

          .bg-pieces {
            grid-column: second-main/full-end;
            background-image: url("/bg-banner.svg");
            background-size: 100% 100%;
            background-position: -10px center;
            background-repeat: no-repeat;
          }

          .background-text{
          color: white;
          font-size: 5vw;
          font-family:'Lexend Exa', sans-serif;
          width: 120%;
          position: relative;
          padding: 4rem 0;
          font-weight: 400;
          margin-left:1rem;
          }

          .banner-text{
            position: absolute;
            top:100px;
            left: 0;
            font-size:2.5vw;
            font-weight: 600;
            width: 50%;
            line-height: 1.5;
            color: black;
          }

          @media(max-width: 768px){

            .banner-text{
              width: 60%;
            }
          }

          @media(max-width: 540px){
            .Hero{
              display:flex;
              height:100vh;
            }

            .block{
              display:none
            }

            .background-text{
              font-size: 3.5rem;
              margin-left:22px;
              margin-rigth:0;
              padding: 3rem 0;
            }

            .banner-text{
              font-size: 2.5rem;
              top: 5rem;
              width: 90%;
            }

            .bg-pieces{
              display:none;
            }
          }
        `}</style>
    </section>

  );
};

export default Banner;
