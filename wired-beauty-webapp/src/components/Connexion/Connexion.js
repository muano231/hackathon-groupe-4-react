import React from "react";
import PropTypes from "prop-types";
import "./Connexion.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../logo.png";

function Connexion() {
  // User Login info
  const database = [
    {
      email: "user1@gmail.com",
      password: "pass1",
    },
    {
      email: "user2@gmail.com",
      password: "pass2",
    },
  ];

  const errors = {
    error: "Invalid username or password",
  };

  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();
    var { email, pass } = document.forms[0];
    // Find user login info
    const userData = database.find((user) => user.email === email.value);
    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.error });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Email not found
      setErrorMessages({ name: "email", message: errors.error });
    }
  };

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Email </label>
          <input type="email" name="email" required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
        </div>
        {renderErrorMessage("pass")}
        {renderErrorMessage("email")}
        <div className="button-container">
          <button type="submit">SIGN IN</button>
        </div>

        <span className="account-text">
          Don't have an account? Sign up <Link to="/register">&nbsp;here</Link>
        </span>
      </form>
    </div>
  );

  // https://contactmentor.com/login-form-react-js-code/

  return (
    <div className="container">
      <img className="img" src={logo} alt="logo" />
      <div className="login-form">
        <div className="title">Sign in</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
}

Connexion.propTypes = {};

Connexion.defaultProps = {};

export default Connexion;
