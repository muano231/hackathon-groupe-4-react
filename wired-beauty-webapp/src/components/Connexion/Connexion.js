import React from "react";
import PropTypes from "prop-types";
import "./Connexion.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../logo.png";
import { Formik, Field, Form } from "formik";
import { Navigate } from "react-router-dom";

function Connexion() {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const renderForm = (
    <div className="form">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (values) => {
          console.log(values);
          fetch(
            "http://f781-2a04-cec0-106c-2e25-e559-b2dc-5ff0-7745.eu.ngrok.io/api/login",
            {
              method: "post",
              body: JSON.stringify(values),
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          )
            .then((res) => res.json())
            .then(
              (result) => {
                setIsSubmitted(true);
                console.log(result);
                // this.setState({
                //   isLoaded: true,
                //   items: Array.of(result),
                // });
              },
              (error) => {
                setIsSubmitted(false);
                console.log(error);
                // this.setState({
                //   isLoaded: true,
                //   error,
                // });
              }
            );
        }}
      >
        <Form>
          <div className="input-container">
            <label>Email </label>
            <Field type="email" name="email" required />
          </div>
          <div className="input-container">
            <label>Password </label>
            <Field type="password" name="password" required />
          </div>
          {/* {renderErrorMessage("pass")}
        {renderErrorMessage("email")} */}
          <div className="button-container">
            <button type="submit">SIGN IN</button>
          </div>

          <span className="account-text">
            Don't have an account? Sign up{" "}
            <Link to="/register">&nbsp;here</Link>
          </span>
        </Form>
      </Formik>
    </div>
  );

  return (
    <div className="container">
      <img className="img" src={logo} alt="logo" />
      <div className="login-form">
        <div className="title">Sign in</div>
        {isSubmitted ? <Navigate to="/dashboard/1" /> : renderForm}
      </div>
    </div>
  );
}

Connexion.propTypes = {};

Connexion.defaultProps = {};

export default Connexion;
