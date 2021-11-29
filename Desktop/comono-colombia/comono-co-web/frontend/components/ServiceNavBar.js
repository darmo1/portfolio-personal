import React from "react";
import Link from "next/link";

const ServiceNavBar = () => {
  return (
    <>
      <nav>
        <ul className="d-flex">
          <Link href="#nube">
            <a>
              <li className="menu-item-one d-flex">Soluciones en la nube</li>
            </a>
          </Link>
          <Link href="#software">
            <a>
              <li className=" menu-item-two d-flex">Software a la medida</li>
            </a>
          </Link>
          <Link href="#web-app">
            <a>
              <li className="menu-item-three d-flex">Páginas web, aplicaciones web y móviles</li>
            </a>
          </Link>
        </ul>
      </nav>

      <style jsx>{`

        nav{
          margin-top: -10rem;
        }

        ul{
          height: 60px;
        }
        
        a {
            flex:1;
          
        }

        li {
          color: black;
          height: 100%;
          justify-content: center;
          align-items: center;
          font-family:'Lexend Exa', sans-serif;
        }

        .menu-item-one{
          background: #A6E2E2
        }
        .menu-item-two{ background:#C6ED88 }
        .menu-item-three{background: #CD9AD8}

        @media(max-width:540px){
          nav{
            margin-top: 0;
            position: sticky;
            top: 0;

          }

          ul{
            flex-direction:column;
          }
        }
      `}</style>
    </>
  );
};

export default ServiceNavBar;
