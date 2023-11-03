import React from "react";
import { Link } from "react-router-dom";

function Navbar(){

    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container d-flex justify-content-baseline">
                <Link class="navbar-brand" to="/">
                <img
                    src="https://logo-download.com/wp-content/data/images/svg/Budget-Rent-a-Car-logo.svg"
                    height="65"
                    alt=""
                    loading="lazy"
                    className=""
                />
                </Link>
                <div class="collapse navbar-collapse" id="navbarButtonsExample">
                    <div class="d-flex align-items-center">
                        <ul class="navbar-nav me-auto mb-lg-0">
                            <li className="nav-item">
                            <h5><Link to = "/dashboard" class="nav-link display-3 ">Dashboard</Link></h5>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>


    )
};

const setBackground = {
    background: "linear-gradient(to bottom, #4CAF50, white)",
}

export default Navbar;