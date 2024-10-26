import React, { useState } from "react";
import "./Login.css";
import assets from "../../assets/assets";
import { signup, login } from "../../config/firebase";

const Login = () => {
  const [currState, setCurrState] = useState("Sign Up");
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (currState === "Sign Up") {
      signup(userName, email, password);
    } else {
      login(email, password);
    }
  };
  return (
    <div className="login">
      <img src={assets.logo_big} alt="" className="logo" />
      <form onSubmit={onSubmitHandler} action="" className="login-form">
        <h2>{currState}</h2>
        {currState === "Sign Up" ? (
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={userName}
            className="form-input"
            placeholder="username"
            type="text"
            required
          ></input>
        ) : null}

        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="form-input"
          placeholder="Email address"
          type="email"
          required
        ></input>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="form-input"
          placeholder="password"
          type="password"
          required
        ></input>
        <button type="submit">
          {" "}
          {currState === "Sign Up" ? "Create an Account" : "Login now"}
        </button>
        <div className="login-term">
          <input type="checkbox" />
          <p>Agree to the terms of use and privacy policy</p>
        </div>

        <div className="login-forgot">
          {currState === "Sign Up" ? (
            <p className="login-toggle">
              Already have an account?{" "}
              <span onClick={() => setCurrState("Login")}>Login here</span>
            </p>
          ) : (
            <p className="login-toggle">
              Create an Account{" "}
              <span onClick={() => setCurrState("Sign Up")}>Click here</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
