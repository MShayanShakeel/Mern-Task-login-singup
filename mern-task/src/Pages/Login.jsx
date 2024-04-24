import React, { useState } from "react";
import "./Login.css";
import { GrTwitter } from "react-icons/gr";
import { RiFacebookFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSingUp = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post("http://localhost:5000/login", data);
      console.warn(response, "Success response");
      alert("Login successful");
      localStorage.setItem("token", JSON.stringify(response?.data?.auth));
      navigate("/home");
    } catch (error) {
      console.error(error, "Error occurred");
      if (error.response) {
        console.error(error.response.data, "Error response from server");
      }
    }
  };
  
  return (
    <>
      <div className="row login-main">
        <div className="col-6 Login-image-section">
          <div>
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Phone image"
            />
          </div>
        </div>
        <div className="col-6 Login-image-section">
          <div className="login-content-main">
            <form action="">
              <input
                type="email"
                placeholder="Email address"
                className="login-input-field custom-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="login-input-field custom-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="Forget-Password">
                <div>
                  <input type="checkbox" /> <label>Remember me</label>
                </div>
                <div>
                  <a href="#">Forget Password</a>
                </div>
              </div>

              <button
                onClick={handleSingUp}
                className="login-input-field "
                style={{
                  backgroundColor: "#386BC0",
                  color: "white",
                  boxShadow: "0px 5px 5px 0px #3B5998",
                }}
              >
                SING IN
              </button>

              <div className="Forget-Password">
                <h4>OR</h4>
              </div>
              <Link to="/singup">
                <button
                  className="login-input-field"
                  style={{
                    backgroundColor: "#3B5998",
                    color: "white",
                    boxShadow: "0px 10px 10px 0px #C6D6F0",
                  }}
                >
                  <RiFacebookFill
                    style={{ marginRight: "10px", fontSize: "2rem" }}
                  />
                  CONTINUE WITH FACEBOOK
                </button>
              </Link>

              <button
                className="login-input-field"
                style={{
                  backgroundColor: "#55ACEE",
                  color: "white",

                  boxShadow: "0px 10px 10px 0px #D4E0F3",
                }}
              >
                <GrTwitter style={{ marginRight: "10px", fontSize: "2rem" }} />{" "}
                CONTINUE WITH TWITTER
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
