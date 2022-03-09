import React from "react";
import PropTypes from "prop-types";
import "./Register.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../logo.png";
import { Formik, Field, Form } from "formik";
import { Navigate } from "react-router-dom";

function Register() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const renderForm = (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
      }}
      onSubmit={async (values) => {
        console.log(values);
        fetch(
          "http://f781-2a04-cec0-106c-2e25-e559-b2dc-5ff0-7745.eu.ngrok.io/api/register",
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
      <div className="form">
        <Form>
          <div className="title">Sign up</div>
          <div className="row">
            <div className="input-container-column">
              <label>Email </label>
              <Field type="email" name="email" className="input" required />
              <label>Password </label>
              <Field
                type="password"
                name="password"
                className="input"
                required
              />
              <label>Age </label>
              <Field type="text" name="age" className="input" required />
            </div>
            <div className="input-container-column">
              <label>Name </label>
              <Field type="text" name="name" className="input" required />
              <label>Size </label>
              <Field type="text" name="size" className="input" required />
              <label>Weight </label>
              <Field type="text" name="weight" className="input" required />
            </div>
          </div>
          <div className="button-container">
            <button type="submit">SIGN UP</button>
          </div>

          <span className="account-text">
            Already have an account? Sign in <Link to="/">&nbsp;here</Link>
          </span>
        </Form>
      </div>
    </Formik>
  );

  return (
    <div className="container-register">
      <img className="img" src={logo} alt="logo" />
      <div className="login-form">
        {isSubmitted ? <Navigate to="/dashboard/1" /> : renderForm}
      </div>
    </div>
  );
}

Register.propTypes = {};

Register.defaultProps = {};

export default Register;
