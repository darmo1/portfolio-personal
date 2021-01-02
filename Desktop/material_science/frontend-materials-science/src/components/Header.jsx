import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../components/img/atomo.svg'
import Colombia from '../components/img/colombia.svg'
import "../styles/header.css"

const Header = () => {
    return (
        <div className="Header">
            <div className="Header-logo">
                <div className="Logo">
                    <Link to="/"><img className="Logo-img" src={Logo} alt="Logo-Science Material"/></Link>
                </div>
            </div>

            <div className="Nav">
                <ul className="Nav-unorderList">
                    <li className="item">Blog</li>
                    <li className="item">About Us</li>
                    <li className="item">Made in <span><img className="colombia-flag" src={Colombia} alt="Made in Colombia" /></span></li>
                    
                </ul>
            </div>
        </div>
    )
}

export default Header
