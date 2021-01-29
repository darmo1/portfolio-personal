import React from "react"
import { Link } from "gatsby"
import logo from '../Img/logo.png'


const Header = () => {
  return (
    <div className="Header w-100 p-2">
      <div className="container-header container">
        <div className="Header_logo">
          <Link to="/">
            <img  src={logo} alt="Logo" className="logo" />
          </Link>
        </div>
        <nav className="Header_menu">
            <div className="nav-menu">
                <ul className="nav-menu-list">
                    <Link to="/"><li className="menu-item t-center">HJEM</li></Link>
                    <Link to="/articles"><li className="menu-item t-center">RESSURSER</li></Link>
                    <Link to="/omOss"><li className="menu-item t-center">OM OSS</li></Link>
                </ul>
            </div>
        </nav>
      </div>
    </div>
  )
}

export default Header
