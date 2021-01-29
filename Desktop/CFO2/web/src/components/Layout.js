import React from 'react'
import Footer from './Footer'
import Header from './Header'
import "../style/Layout.css"

const Layout = (props) => {
    return (
        <div className="Layout">
            <Header />
                {props.children}
            <Footer />
            
        </div>
    )
}

export default Layout
