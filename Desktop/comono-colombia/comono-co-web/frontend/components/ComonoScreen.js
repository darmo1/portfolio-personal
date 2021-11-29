import * as React from "react";
import {SomosComono} from '../UI/SomosComono'
const ComonoScreen = () => {
    const screenComono = React.useRef(null)

  return (
    <>
      <div className="bg blue" ref={screenComono}>
        <div className="container d-flex">
          {/* <img src={"/comono-screen.svg"} alt="somos comono" /> */}
          <SomosComono />
        </div>
        <div className="container-band"></div>
        <div className="vertical-band"></div>
      </div>
      <style jsx>{`
        .bg {
          width: 100%;
          height: 100vh;
          background: #3489ce;
          animation-name: fadeOut;
          animation-duration: 1s;
          animation-timing-function: ease;
          animation-delay: 3s;
          animation-fill-mode: forwards;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 100;
        }

        .container {
          max-width: 70rem;
          margin: auto;
          justify-content: center;
          align-items: center;
          height: 100%;
          width: 100%;
          padding: 3rem;
        }

        .container-band {
          position: absolute;
          height: 100vh;
          width: 350px;
          top: 0;
          right: 0;
          z-index: 2;
          background-image: url("/bg-comono-transition.svg");
          background-repeat: no-repeat;
          background-size: contain;
          background-position: right;
        }

        .vertical-band {
          position: absolute;
          height: 100vh;
          width: 150px;
          background: white;
          top: 0;
          right: 100px;
          z-index: 1;
        }

        @keyframes fadeOut {
          0% {
            transform:translateY(0) ;
            opacity: 1;
          }
          100% {
            transform:translateY(-100vh) ;
            opacity: 0;
            display: none;
          }
        }

        @media (max-width: 1500px) {
          .vertical-band {
            opacity: 0.3;
          }
        }

        @media (max-width: 768px) {
          .container-band,
          .vertical-band {
            display: none;
          }

          .container {
            padding: 3rem;
          }

          .container  img {
            margin-right: 1rem;
          }
        }
      `}</style>
    </>
  );
};

export default ComonoScreen;
