import * as React from "react";
import { useWindowSize } from "../hooks/useWindowSize";
import { PortableText, urlFor } from "../lib/sanity";

const CardEmployee = ({ employee, index }) => {
  const size = useWindowSize();

  return (
    <>
      <div
        className="container"
        style={
          employee?.backgroundColor && {
            background: `#${employee?.backgroundColor}`,
          }
        }
      >
        <div className="slider d-flex">
          <div className="employee d-flex">
            <div className="employee-info">
              <h2 className="employee-profile">{employee.profile}</h2>
              <p>
                <PortableText blocks={employee?.skill} />
              </p>
            </div>

            <div className="employee-name">
              {size.width <= "768" && employee?.imageURL && (
                <img
                  src={urlFor(employee.imageURL).url()}
                  alt={employee.name}
                />
              )}
              <h1
                style={
                  employee?.fontColor && { color: `#${employee?.fontColor}` }
                }
              >
                {employee.name}
              </h1>
            </div>
          </div>

          {size.width > "768" ? (
            <div
              className="employee-img"
              style={index % 2 === 0 ? { order: "-1" } : { order: "1" }}
              data-index={index}
            >
              {employee?.imageURL && (
                <img
                  src={urlFor(employee.imageURL).url()}
                  alt={employee.name}
                />
              )}
            </div>
          ) : null}
        </div>
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          height: 100%;
        }

        .slider {
          max-width: 70rem;
          width: 100%;
          margin: auto;
          height: 100%;
          display: flex;
        }

        .employee {
          max-width: 50%;
          width: 100%;
          padding: 0 2rem;
          flex-direction: column;
          justify-content: space-evenly;
        }

        .employee-info {
          margin: 1rem 0;
          display: flex;
          flex-direction: column;
          justify-content: start;
          padding: 1rem;
        }

        .employee-info p {
          display: flex;
          flex-flow: column wrap;
          color: white;
          text-align: justify;
          font-family: "Lexend Exa", sans-serif;
          font-weight: 100;
          font-size: 0.85rem;
          line-height: 1.3;
        }

        .employee-profile {
          color: white;
          background: black;
          font-size: 0.7rem;
          margin: 0 auto 1rem 0;
          position: relative;
          max-width: 50%;
          font-family: "Lexend Exa", sans-serif;
          font-weight: 200;
          text-align: start;
          padding: 0.3rem 0.7rem;
        }

        .employee-profile::before {
          content: "";
          background: white;
          position: absolute;
          width: 50%;
          height: 2px;
          bottom: 0;
          left: 0;
        }

        .employee-name {
          margin-bottom: 1rem;
          letter-spacing: 0.7rem;
        }

        h1 {
          font-size: 6vw;
          text-align: left;
          padding-left: 1rem;
          font-family:'Lexend Exa', sans-serif;
        }
        

        .employee-img {
          max-width: 50%;
          width: 100%;
          align-self: center;
          background-image: url("/rayas-blancas-about-us.svg");
          background-repeat: no-repeat;
          height: 500px;
          background-position: 50%;
          background-size: contain;
        }

        .employee-img img {
          width: 90%;
          
        }

        img {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 90%;
        }

        @media (max-width: 768px) {
          .slider {
            width: 100%;
            height: 100%;
          }

          .employee {
            max-width: 100vw;
            width: 100%;
            justify-content: start;
          }

          .employee-profile {
            max-width: 100%;
            font-size: 0.9rem;
          }

          .employee-name img {
            margin-bottom: 2rem;
            max-height: 50%;
          }

          h1 {
            font-size: 10vw;
            margin-bottom: 2rem;
            text-align: center;
          }
        }
      `}</style>
    </>
  );
};

export default CardEmployee;
