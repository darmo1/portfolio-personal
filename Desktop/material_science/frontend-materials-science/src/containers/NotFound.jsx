import React from "react";
import { Link } from "react-router-dom";
import Banner from '../components/Banner'
import "../styles/notFound.css"
const NotFound = () => {
  return (
    <div className="container">
  
      <div className="NotFound">
        <h1 className="NotFound-title">Page not found</h1>
        <p className="NotFound-text">Unfortunately, the page you're trying to open does not exist.</p>

        <Link to="/">
          <span className="NotFound-return">Return to Home  👈</span>
        </Link>
      </div>
      <div className="footer">
      <Banner />
      </div>
    </div>
  );
};

export default NotFound;
