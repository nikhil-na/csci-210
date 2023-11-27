import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../header/navbar";
import Footer from "../header/footer";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(""); // State variable to manage the error message
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/login", values);
      if (res.data.Status === "Success") {
        navigate("/dashboard");
        setError("");
      } else if (
        res.data.errors &&
        res.data.errors.password === "incorrect password"
      ) {
        setError("Incorrect password. Please try again.");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      // Check if the error has a response with a status code and data
      if (err.response) {
        const { status, data } = err.response;

        if (
          status === 400 &&
          data.errors &&
          data.errors.password === "Incorrect password"
        ) {
          setError("Incorrect password");
        } else {
          setError("Check Your Credentials");
        }

        console.log(data); // You can log the entire response data for more information
      } else {
        console.log(err.message);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <section className="mb-5">
        <div className="px-4 py-5 px-md-5 text-center text-lg-start">
          <div className="container-fluid mt-5">
            <div className="row gx-lg-5 align-items-center">
              <div className="col-lg-6 pt-5 mb-5 mb-lg-0">
                <h1 className="my-5 pt-5 display-3 fw-bold ls-tight">
                  Login <br />
                  <span className="text-primary">Manage your finance</span>
                </h1>
              </div>
              <div className="col-lg-6 mb-5 mb-lg-0">
                <div className="card">
                  <div className="card-body py-5 px-md-5">
                    <form onSubmit={handleSubmit}>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="email">
                          Email address
                        </label>
                        <input
                          type="email"
                          placeholder="Enter a valid email address"
                          id="email"
                          className="form-control"
                          onChange={(e) => {
                            setValues({ ...values, email: e.target.value });
                          }}
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="password">
                          Password
                        </label>
                        <input
                          type="password"
                          placeholder="Enter a valid password"
                          id="password"
                          className="form-control"
                          onChange={(e) => {
                            setValues({ ...values, password: e.target.value });
                          }}
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn btn-success btn-block mb-4 w-100"
                      >
                        Login
                      </button>

                      {error && (
                        <div className="alert alert-danger" role="alert">
                          {error}
                        </div>
                      )}

                      <p>If you don't have an account, </p>
                      <Link
                        to="/signup"
                        className="btn btn-default border w-100 mb-2 text-decoration-none"
                      >
                        Signup
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

export default Login;
