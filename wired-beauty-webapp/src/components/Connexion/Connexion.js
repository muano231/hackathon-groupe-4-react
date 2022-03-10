import React, { useEffect, useRef } from "react";
import "./Connexion.scss";
import TOPOLOGY from "vanta/dist/vanta.topology.min";
import * as p5 from "p5";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../logo.png";
import { Formik, Field, Form } from "formik";
import { Navigate } from "react-router-dom";

function Connexion({fromNotFound}) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [roleAdmin, setRoleAdmin] = useState(false);

  const location = useLocation();

  const [vantaEffect, setVantaEffect] = useState(0);
  const myRef = useRef(null);
   useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        TOPOLOGY({
          el: myRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: true,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0xf8dad9,
          backgroundColor: 0x1a1a1a,
          p5: p5, //This is different
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  console.log(location.pathname);

  const isLoginPage = location.pathname === "/" || fromNotFound;
  const isRegisterPage = location.pathname === "/register";

  return (
    <div className="background" ref={myRef}>
      <div className="container">
        <div className="login-form">
          <img className="img" src={logo} alt="logo" />

          {isSubmitted ? (
            <Navigate to="/dashboard/campaigns" />
          ) : roleAdmin ? (
            <Navigate to="/admin/campaigns" />
          ) : isLoginPage ? (
            <>
              <p className="title">Sign in</p>
              <div className="form">
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  onSubmit={async (values) => {
                    fetch(process.env.REACT_APP_API + "/api/login", {
                      method: "post",
                      body: JSON.stringify(values),
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                    })
                      .then((res) => res.json())
                      .then(
                        (result) => {
                          if (result.access_token) {
                            sessionStorage.setItem("isLoggedIn", true);
                            sessionStorage.setItem("role", result.user.role);
                            sessionStorage.setItem(
                              "user",
                              JSON.stringify(result)
                            );
                            result.user.role === "admin"
                              ? setRoleAdmin(true)
                              : setIsSubmitted(true);
                            // setIsSubmitted(true)
                          } else {
                            setIsSubmitted(false);
                            alert(
                              "Error, please verify your user or your password"
                            );
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
                      <button type="submit">Sign in</button>
                    </div>

                    <span className="account-text">
                      <p>
                        Don't have an account? Sign up
                        <Link to="/register">&nbsp;here</Link>
                      </p>
                    </span>
                  </Form>
                </Formik>
              </div>
            </>
          ) : isRegisterPage ? (
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
              }}
              onSubmit={async (values) => {
                console.log(values);
                const token = JSON.parse(
                  sessionStorage.getItem("user")
                ).access_token;
                fetch(process.env.REACT_APP_API + "/api/register", {
                  method: "post",
                  body: JSON.stringify(values),
                  headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                })
                  .then((res) => res.json())
                  .then((result) => {
                    sessionStorage.setItem("isLoggedIn", true);
                    sessionStorage.setItem("user", JSON.stringify(result));
                    setIsSubmitted(true);
                    // this.setState({
                    //   isLoaded: true,
                    //   items: Array.of(result),
                    // });
                  });
              }}
            >
              <div className="form">
                <Form>
                  <p className="title">Sign up</p>
                  <div className="row">
                    <div className="input-container asColumn">
                      <div>
                        <label>Email</label>
                        <Field
                          type="email"
                          name="email"
                          className="input"
                          required
                        />
                      </div>
                      <div>
                        <label>Password</label>
                        <Field
                          type="password"
                          name="password"
                          className="input"
                          required
                        />
                      </div>
                      <div>
                        <label>Age</label>
                        <Field
                          type="text"
                          name="age"
                          className="input"
                          required
                        />
                      </div>
                      <div>
                        <label>Name</label>
                        <Field
                          type="text"
                          name="name"
                          className="input"
                          required
                        />
                      </div>
                      <div>
                        <label>Size</label>
                        <Field
                          type="text"
                          name="size"
                          className="input"
                          required
                        />
                      </div>
                      <div>
                        <label>Weight</label>
                        <Field
                          type="text"
                          name="weight"
                          className="input"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="button-container">
                    <button type="submit">Sign up</button>
                  </div>

                  <span className="account-text">
                    <p>
                      Already have an account? Sign in
                      <Link to="/">&nbsp;here</Link>
                    </p>
                  </span>
                </Form>
              </div>
            </Formik>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

Connexion.propTypes = {};

Connexion.defaultProps = {};

export default Connexion;
