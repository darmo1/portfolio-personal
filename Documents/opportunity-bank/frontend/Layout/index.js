import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/NavBar'
import CallToAction from '../components/CallToAction'

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <CallToAction />
      <main className="container-page">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
