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
  const [roleAdmin, setRoleAdmin] = useState(false);

  const renderForm = (
    <div className="form">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (values) => {
          fetch(
            "http://0e0c-2a01-cb14-1bc-7800-2c8f-d762-8a92-c07c.eu.ngrok.io/api/login",
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
                if (result.access_token) {
                  sessionStorage.setItem("isLoggedIn", true);
                  sessionStorage.setItem("role", result.user.role);
                  sessionStorage.setItem("user", JSON.stringify(result));
                  result.user.role == "admin"
                    ? setRoleAdmin(true)
                    : setIsSubmitted(true);
                  // setIsSubmitted(true)
                } else {
                  setIsSubmitted(false);
                  alert("Error, please verify your user or your password");
                }
              },
              (error) => {
                setIsSubmitted(false);
                console.log(error);
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
        {}
        {isSubmitted ? (
          <Navigate to="/dashboard/campaigns" />
        ) : roleAdmin ? (
          <Navigate to="/admin/campaigns" />
        ) : (
          renderForm
        )}
      </div>
    </div>
  );
}

Connexion.propTypes = {};

Connexion.defaultProps = {};

export default Connexion;
