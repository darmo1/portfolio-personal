import * as React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import menuItemsSpanish   from '../utils/menuItemsSpanish';
import menuItemsEnglish  from '../utils/menuItemsEnglish'


const NavBar = ({locale}) => {

  const router = useRouter()
  const menuItems = locale === 'es-CO' ? menuItemsSpanish : menuItemsEnglish;
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const changeLanguage = (e) => {
    const locale = e.target.value;
    router.push(router.pathname, router.asPath, { locale });
  };

  const hanldeMenu = () => {
    setTimeout(() => {
      setIsMenuOpen(!isMenuOpen);
    }, 500);
  };

  return (
    <div className="container-header">
      <nav className="d-flex justify-content-between align-items-center">
        <Link href="/">
          <a>
            <div>
              <img src="/logo.svg" alt="icon" width={45.93} height={45.93} />
            </div>
          </a>
        </Link>

        <div className="menu-mobile" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <img src="/menu-mobile.svg" alt="menu-mobile" />
        </div>

        <div className={isMenuOpen ? "nav-menu active" : "nav-menu"}>
          <ul className="menu-list d-flex">
            { menuItems.map((item) => {
              return (
                <li className={item.className} key={item.id}>
                  <Link href={item.url}>
                    <a onClick={hanldeMenu}>{item.title}</a>
                  </Link>
                </li>
              );
            })}

            <select defaultValue={locale} onChange={changeLanguage}>
              <option value="es-CO">ES</option>
              <option value="en-US">EN</option>
            </select>
          </ul>
        </div>
      </nav>
      <style jsx>{`
      .container-header{
        
        background:black;
        position:sticky;
          top:0;
          z-index:20;

      }
        nav {
         max-width:70rem;
         margin:auto;
         padding: 1rem;
          flex-wrap: wrap;
         
        }

        .menu-list-item {
          margin: 0 1rem;
          color: #fff;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .menu-mobile {
          display: none;
        }

        @media (max-width: 520px) {
          nav {
            height: 70px;
            position: sticky;
            top: 0;
            z-index: 20;
            
          }

          .menu-mobile {
            display: block;
            position: relative;
          }

          .nav-menu {
            display: flex;
            flex-direction: column;
            width: 100%;
            background-color: #000000;
            height: 100vh;
            position: absolute;
            top: 70px;
            opacity: 0.9;
            transition: all 0.5s ease;
            right: 100%;
            z-index: ;
          }

          .nav-menu.active {
            right: 0;
            transition: all 0.5s ease;
            z-index: 1;
          }

          .menu-list {
            flex-direction: column;
            width: inherit;
            align-items: center;
            height: 75%;

            margin-top: 1rem;
          }
          .menu-list-item {
            font-size: 2rem;
            margin: 1rem 0;
          }
        }
      `}</style>
    </div>
  );
};

export default NavBar;
