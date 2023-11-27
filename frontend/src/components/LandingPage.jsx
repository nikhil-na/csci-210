// LandingPage.js

import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./header/navbar";
import Footer from "./header/footer";

import "./LandingPage.css"; // Import the external CSS file

function LandingPage() {
  return (
    <div>
      <Navbar />
      <header>
        <div className="header-container">
          <h1>
            Control Your Finances with{" "}
            <span className="text-success">Expense Tracker</span>
          </h1>
          <p>Track your spending and set financial goals.</p>
        </div>
        <div className="container">
          <Link to="/login" className="btn btn-success text-decoration-none">
            <strong>Get Started - Login</strong>
          </Link>
          <Link to="/signup" className="btn btn-secondary text-decoration-none">
            <strong>Join Now - Register</strong>
          </Link>
        </div>
      </header>
      <Footer />
    </div>
  );
}

export default LandingPage;
