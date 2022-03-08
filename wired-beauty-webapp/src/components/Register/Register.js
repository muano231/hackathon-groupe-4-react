import React from "react";
import PropTypes from "prop-types";
import "./Register.scss";
import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
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
    // const userData = database.find((user) => user.email === email.value);
    // Compare user info
    // if (userData) {
    //   if (userData.password !== pass.value) {
    //     // Invalid password
    //     setErrorMessages({ name: "pass", message: errors.error });
    //   } else {
    //     setIsSubmitted(true);
    //   }
    // } else {
    //   // Email not found
    //   setErrorMessages({ name: "email", message: errors.error });
    // }
  };

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="input-container-column">
            <label>Email </label>
            <input type="email" name="email" className="input" required />
            <label>Password </label>
            <input type="password" name="pass" className="input" required />
            <label>Age </label>
            <input type="password" name="pass" className="input" required />
          </div>
          <div className="input-container-column">
            <label>Name </label>
            <input type="password" name="pass" className="input" required />
            <label>Size </label>
            <input type="password" name="pass" className="input" required />
            <label>Weight </label>
            <input type="password" name="pass" className="input" required />
          </div>
        </div>
        {/* {renderErrorMessage("pass")}
        {renderErrorMessage("email")} */}
        <div className="button-container">
          <button type="submit">SIGN UP</button>
        </div>

        <span className="account-text">
          Already have an account? Sign in <Link to="/">&nbsp;here</Link>
        </span>
      </form>
    </div>
  );

  return (
    <div className="container-register">
      <div className="login-form">
        <div className="title">Sign up</div>
        {isSubmitted ? <div>User is successfully signed in</div> : renderForm}
      </div>
    </div>
  );
}

Register.propTypes = {};

Register.defaultProps = {};

export default Register;
