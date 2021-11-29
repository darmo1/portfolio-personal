import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useWindowSize } from "../hooks/useWindowSize";
import {menuCallToActionsSpanish , menuCallToActionsEnglish} from "../utils/menu-callToAction.";


const CallToAction = () => {

  const router = useRouter();
  const { locale } = router;

  const menuCallToActions = locale === 'es-CO' ? menuCallToActionsSpanish : menuCallToActionsEnglish;
  const [isOpenCTA, setIsOpenCTA] = React.useState(false);
  const [showNumberPhone, setShowNumberPhone] = React.useState(false);
  const [copySuccess, setCopySuccess] = React.useState(false);

  const size = useWindowSize();
  const numberCompany = React.useRef(null);

  const handleCallUs = (e) => {
    setShowNumberPhone(true);
    navigator.clipboard.writeText("3135805122");
    setCopySuccess(true);
    setTimeout(() => {
      setShowNumberPhone(false);
      setCopySuccess(false);
    }, 3000);
  };

  const handleCta = () => {
    setIsOpenCTA(false);
  };

  const handleCallUsMobile = () => {};

  return (
    <>
      <div className={isOpenCTA ? "bg-cta  active" : "bg-cta"}></div>

      <div className="menu-cta">
        <div onClick={() => setIsOpenCTA(!isOpenCTA)}>
          {isOpenCTA ? (
            <img
              className="btn btn-close"
              src="/close-icon.svg"
              alt="close-button"
            />
          ) : (
            <img className="btn btn-close" src="/cta.svg" alt="cta-button" />
          )}
        </div>
        {isOpenCTA && (
          <div className="container-cta">
            {menuCallToActions.map((item, index) => {
              if (size.width > 500 && item.title === "Llamanos" || item.title === "Call Us") {
                return (
                  <div
                    className={`${item.className} d-flex  opt-cta`}
                    onClick={handleCallUs}
                    key={index}
                  >
                    <div>
                      {item.title} <br />
                      <p
                        ref={numberCompany}
                        className={
                          showNumberPhone ? "active-opacity" : "opacity-none"
                        }
                      >
                        3135805122
                      </p>
                      {copySuccess && <span>{locale === 'es-CO' ? 'Copiado' : 'Copied' }</span>}
                    </div>

                    <div className="container-img d-flex">
                      <img src={item.icon} alt="icon" className="img-cta" />
                    </div>
                  </div>
                );
              }

              if (size.width < 500 && item.title === "Llamanos") {
                return (
                  <Link href="tel:+573135805122" key={index}>
                    <a>
                      <div
                        className={`${item.className} d-flex  opt-cta`}
                        onClick={handleCallUsMobile}
                        key={index}
                      >
                        <div>{item.title}</div>

                        <div className="container-img d-flex">
                          <img src={item.icon} alt="icon" className="img-cta" />
                        </div>
                      </div>
                    </a>
                  </Link>
                );
              }

              return (
                <Link href={item.href} key={index}>
                  <a>
                    <div
                      className={`${item.className} d-flex  opt-cta`}
                      onClick={handleCta}
                    >
                      <p>{item.title}</p>
                      <div className="container-img d-flex">
                        <img src={item.icon} alt="icon" className="img-cta" />
                      </div>
                    </div>
                  </a>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      <style jsx>{`
        .bg-cta {
          position: fixed;
          bottom: -500px;
          right: -500px;
          background: #f9f9f9;
          z-index: 10;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          box-shadow: 0 3px 4px 0 rgb(94 94 94 / 70%);
          
        }

        .active {
          position: fixed;
          bottom: -120px;
          right: -100px;
          animation: moveInLeft 0.5s ease-out;
        }

        @keyframes moveInLeft {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        a {
          color: black;
        }

        .active-opacity {
          opacity: 1;
          position: relative;
        }

        .opacity-none {
          opacity: 0;
          position: absolute;
        }

        span{
          color: blue;
        }
        .menu-cta,
        .menu-list {
          position: fixed;
        }

        .menu-cta {
          right: 18px;
          bottom: 100px;
          z-index: 100;
          justify-content: flex-end;
        }

        .menu-list {
          justify-content: space-between;
          align-items: center;
        }

        .opt-cta {
          font-family:'Lexend Exa', sans-serif;
          padding: 0.5rem 0.5rem;
          color:black;
          
        }

        .img-cta {
          width: 35px;
          height: 35px;
          position: relative;
        }

        .container-img{
          
          background: #F4F4F4;
          border-radius: 50%;
         
          display:flex;
          justify-content:center;
          align-items:center;
          padding:1rem;
          box-shadow: 1px -0px 7px -0px rgb(3 0 0 / 65%);
        }

        .menu-list > * {
          margin: 0 1rem;
        }

        .call-icon {
          bottom: 250px;
          right: 57px;
        }
        .write-icon {
          bottom: 170px;
          right: 127px;
        }
        .ring-icon {
          bottom: 90px;
          right: 127px;
        }
        .location-icon {
          bottom: 10px;
          right: 80px;
        }

        .btn-close {
          width: 80px;
          height: 80px;
        }
      `}</style>
    </>
  );
};

export default CallToAction;
