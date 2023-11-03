import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./header/navbar";
import Footer from "./header/footer";

function LandingPage(){
    return (
        <div>
            <Navbar />
            <header style={ styleHeader }>
            <div className="vh-100 d-flex"> 
                <div className = "header-container">
                    <h1 className="text-dark">Your Personal<div className="text-success">Expense Tracker</div></h1>                           
                </div>
                <div className="container d-flex justify-content-center align-items-center">
                    <Link to = "/login" className="btn btn-success px-5 mt-5 mx-3 text-decoration-none"><strong>Login</strong></Link>
                    <Link to ="/signup" className="btn btn-secondary px-5 mt-5 text-decoration-none"><strong>Register</strong></Link>
                </div>
            </div>
            <Footer />
            </header>
        </div>

)
}

const styleHeader = {
    width: "100%",
    height: "auto",
    background:"linear-gradient(45deg, #808080, #ffffff)",
}


export default LandingPage;