import * as React from "react";
import Button from "../UI/Button";
import EN from "../utils/EN";
import ES from "../utils/ES";



const services = ({dataService, locale}) => {

  const phrase = locale === 'es-CO' ?   ES?.service?.title :  EN?.service?.title;
  const [services, setService] = React.useState({
    ["cloud-service"]: false,
    ["app-service"]: false,
    ["software-service"]: false,
  });

  const handleClick = (e) => {
    const serviceName = e.target.dataset.name;
    setService({
      ["cloud-service"]: false,
      ["app-service"]: false,
      ["software-service"]: false,
      [serviceName]: !services[serviceName],
    });
  };

  return (
    <main>
      <div className="container-head">
        <div className="bg-black"></div>
        <div className="bg-gray">
          <div className="head-phrase"> {phrase}</div>
        </div>
      </div>

      <div className="container-service">
        <section className="service cloud-service" >
          <div>
            <div className="head-service d-flex align-items-center"  data-name="cloud-service" onClick={handleClick}>
              <img src="/arrow-white.svg" alt="arrow" />
              <div className="title-service" data-name="cloud-service" onClick={handleClick}> {dataService[0]?.name} </div>
            </div>
            {
              services["cloud-service"] &&
              <div className="text-service">
              <p>
              {dataService[0]?.description}
              <Button url="/servicios#nube" locale={locale} />
              </p> 
              </div>
            }
          </div>
        </section>

        <section className="service app-service">
          <div>
            <div className="head-service d-flex align-items-center" data-name="app-service" onClick={handleClick}>
              <img src="/arrow-white.svg" alt="arrow" />
              <div className="title-service" data-name="app-service" onClick={handleClick}> {dataService[2]?.name} </div>
            </div>
            {
              services["app-service"] &&
              <div className="text-service">
              <p>
              {dataService[2]?.description}
              <Button url="/servicios#web-app"  locale={locale} />
              </p>
              </div>
            }
          </div>
        </section>

        <section className="service software-service">
          <div>
            <div className="head-service d-flex align-items-center" data-name="software-service" onClick={handleClick}>
              <img src="/arrow-white.svg" alt="arrow" />
              <div className="title-service" data-name="software-service" onClick={handleClick}> {dataService[1]?.name} </div>
            </div>
            {
              services["software-service"] &&
              <div className="text-service">
              <p>
                {dataService[1]?.description}
                <Button url="/servicios#software"  locale={locale} />
              </p>
             
              </div>
            }
          </div>
        </section>
      </div>

      <style jsx>{`
        .container-head{
          height: 100px;
          width:100%;
          position: relative;
      }

      .bg-black{
          background-color: black;
          height: 6.5rem;
          width:100%;
          transform: skewY(1deg);
          position:absolute;
          bottom:0px;
      }

      .bg-gray{
          background-color: #F4F4F4;
          height: 6rem;
          width:100%;
          padding: 0 1rem;
          transform: skewY(-4deg);
          position:absolute;
          bottom:0;  
          font-family:'Lexend Exa', sans-serif;
          font-size: 1.5rem;
          line-height: 3.125rem;
          display:flex;
          justify-content:center;
          align-items:center;     
      }

      .head-phrase{
        max-width: 70rem;
        width: 100%;
        padding: 0 1rem;
      }

      .service{
        height: auto;
        background-size:cover;
        background-position: top;
        font-weight:bold;
      }
      .text-service{
        padding-bottom: 1.5rem;
      }

      .cloud-service{
        background-image: url('/services-blue-screen.svg');
        display:flex;
        flex-direction: column;
        
      }

      .head-service{
        height:150px;
        color: white;
        justify-content: flex-end;
        align-content: center;
        cursor:pointer;
      }

      .head-service > img{
        width:45px;
      }

      @keyframes Scale{
        0%{
          transform: scale(1)
        }
        100%{
          transform: scale(1.05)
        }
      }
      
      .head-service:hover{
        animation: Scale 0.5s ease-in forwards;
      }

     
      

      .title-service {
        font-size: 2rem;
        margin-left: 4.5rem;
        text-align:left;
        
      }

      .service > div{
        width: 100%;
        max-width: 70rem;
        margin:auto;
        padding: 0 1rem;

      }
      
      .service > div p {
        text-align: right;
        
        color: white;
        width: 66%;
        margin-right: 0;
        margin-left: auto;
       
       
        font-size: 1.2rem;
      }

      .app-service{
        background-image: url('/services-purple-screen.svg');
      }

      .software-service{
        background-image: url('/services-green-screen.svg');
      }
      

      @media (max-width: 540px) {
        .container-head{
          height: 0px;
      }

      .bg-gray{
        font-size:1rem;
      }

      .head-service{
        min-height: auto;
      }

      .head-service > img {
        width: 35px;
        margin-left: 1rem;
      }

      .title-service {
        font-size: 2rem;
        margin-left: 2rem;
        text-align:center;
      }

      .service > div p {
        font-size: 1.2rem;
        padding-top: 0;
        font-weight: 400;
      }

      @keyframes Scale{
        0%{
          transform: scale(1)
        }
        100%{
          transform: scale(1.03)
        }
      }
    }
      `}</style>
    </main>
  );
};

export default services;
