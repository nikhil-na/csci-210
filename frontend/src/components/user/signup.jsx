import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../header/navbar";
import Footer from "../header/footer";

function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/signup", values)
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/dashboard");
        } else {
          console.log("Error");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Navbar />
      <section class="mb-5">
        <div class="px-4 py-5 px-md-5 text-center text-lg-start">
          <div class="container-fluid mt-5">
            <div class="row gx-lg-5 align-items-center">
              <div class="col-lg-6 pt-5 mb-5 mb-lg-0">
                <h1 class="my-5 pt-5 display-3 fw-bold ls-tight">
                  Sign Up <br />
                  <span class="text-primary">Create an account</span>
                </h1>
              </div>
              <div class="col-lg-6 mb-5 mb-lg-0">
                <div class="card">
                  <div class="card-body py-5 px-md-5">
                    <form onSubmit={handleSubmit}>
                      <div class="form-outline mb-4">
                        <label class="form-label" for="name">
                          Username
                        </label>
                        <input
                          type="name"
                          placeholder="Enter your name"
                          id="name"
                          class="form-control"
                          onChange={(e) => {
                            setValues({ ...values, name: e.target.value });
                          }}
                        />
                      </div>

                      <div class="form-outline mb-4">
                        <label class="form-label" for="email">
                          Email address
                        </label>
                        <input
                          type="email"
                          placeholder="Enter a valid email address"
                          id="email"
                          class="form-control"
                          onChange={(e) => {
                            setValues({ ...values, email: e.target.value });
                          }}
                        />
                      </div>

                      <div class="form-outline mb-4">
                        <label class="form-label" for="password">
                          Password
                        </label>
                        <input
                          type="password"
                          placeholder="Enter a valid password"
                          id="password"
                          class="form-control"
                          onChange={(e) => {
                            setValues({ ...values, password: e.target.value });
                          }}
                        />
                      </div>

                      <button
                        type="submit"
                        class="btn btn-success btn-block mb-4 w-100"
                      >
                        Sign up
                      </button>
                      <p>If you have an account, </p>
                      <Link
                        to="/login"
                        className="btn btn-default border w-100 mb-2 text-decoration-none"
                      >
                        Login
                      </Link>
                      <Link to="/">Back to Homepage</Link>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Signup;
