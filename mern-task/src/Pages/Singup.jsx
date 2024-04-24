import React, { useState } from "react";
import "./Login.css";
import { GrTwitter } from "react-icons/gr";
import { RiFacebookFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Singup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

 
  const handleSingUp = async (e) => {
    e.preventDefault();

    const data = {
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    try {
      if (password !== confirmPassword) {
        alert("Confirm Password not same");
        return;
      }
      const response = await axios.post(
        "http://localhost:5000/registerrr",
        data
      );
      console.warn(response, "Success response");
      alert("Registration successful");
      navigate("/");
    } catch (error) {
      console.error(error, "Error occurred");
      if (error.response) {
        console.error(error.response.data, "Error response from server");
      }
    }
  };

  console.log(
    firstName,
    lastName,
    gender,
    email,
    password,
    confirmPassword,
    "done"
  );

  return (
    <>
      <div className="row login-main">
        <div className="col-6 Login-image-section">
          <div className="login-content-main">
            <form
              action=""
              onSubmit={handleSingUp}
              style={{ width: "60%", margin: "auto" }}
            >
              <input
                type="text"
                placeholder="First Name"
                className="login-input-field custom-input"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="login-input-field custom-input"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <select
                className="login-input-field custom-input"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
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
              <input
                type="password"
                placeholder="Confirm Password"
                className="login-input-field custom-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <Link to="/">
                <div className="have-account">I have already account</div>
              </Link>

              <button
                type="submit"
                className="login-input-field "
                style={{
                  backgroundColor: "#386BC0",
                  color: "white",
                  boxShadow: "0px 5px 5px 0px #3B5998",
                }}
                // onClick={handleSingUp}
              >
                SING UP
              </button>
            </form>
          </div>
        </div>
        <div className="col-6 Login-image-section">
          <div>
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Phone image"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Singup;
