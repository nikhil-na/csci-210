// Navbar.js

import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css"; // Import the external CSS file

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container d-flex justify-content-baseline">
        <Link className="navbar-brand" to="/">
          <img
            src="https://logo-download.com/wp-content/data/images/svg/Budget-Rent-a-Car-logo.svg"
            height="65"
            alt=""
            loading="lazy"
            className=""
          />
        </Link>
        <div className="collapse navbar-collapse" id="navbarButtonsExample">
          <div className="d-flex align-items-center">
            <ul className="navbar-nav me-auto mb-lg-0">
              <li className="nav-item">
                <h5>
                  <Link to="/dashboard" className="nav-link display-3">
                    Dashboard
                  </Link>
                </h5>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
