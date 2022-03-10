import React, { useState } from "react";
import PropTypes from "prop-types";
import "./AdminCampaigns.scss";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { Formik, Form, Field } from "formik";

class AdminCampaigns extends React.Component {
  currentDate = new Date();

  constructor(props) {
    super(props);
    this.createNewSession = false;
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }

  componentDidMount() {
    // console.log(JSON.parse(sessionStorage.getItem("user")));
    const token = JSON.parse(sessionStorage.getItem("user")).access_token;
    fetch(process.env.REACT_APP_API + "/api/studies", {
      method: "get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  creationSession = () => {
    console.log("hello");
    this.createNewSession = true;
  };

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return (
        <div className="spinner">
          <div class="spinner-grow" role="status">
            <span class="sr-only"></span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="campaigns-list">
          {items.map((item) => (
            <div key={item.id} className="campaign">
              {/* <h3 className="product-name">{item.product.name}</h3> */}
              <div className="sessions-list">
                {item.sessions.map((session) => {
                  return (
                    <div key={session.id} className="session-card">
                      <h4>Session #{session.id}</h4>
                      <p>
                        <b>Description : </b>
                        {session.description}
                      </p>
                      {/* <p>{session.availability_start}</p> */}
                      <p>
                        <b>Final date: </b>
                        {session.availability_end}
                      </p>
                      {/* <Link
                        to={"/study/" + session.study_id}
                        state={session.study_id}
                      > */}
                      <Link
                        to={"/study/" + session.study_id}
                        state={session.study_id}
                      >
                        <button>Modify</button>
                        <button>Delete</button>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          {/* CREATION DE LA NOUVELLE SESSION */}
          <div>
            Session
            <button onclick={this.createNewSession === true}>
              Create new session
            </button>
          </div>
          {this.createNewSession ? (
            <Formik
              initialValues={{
                study_id: "",
                availability_start: "",
                availability_end: "",
                description: "",
                questions: "",
              }}
              onSubmit={async (values) => {
                console.log(values);
                const token = JSON.parse(
                  sessionStorage.getItem("user")
                ).access_token;
                fetch(process.env.REACT_APP_API + "/api/sessions", {
                  method: "post",
                  body: JSON.stringify(values),
                  headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                })
                  .then((res) => res.json())
                  .then(
                    (result) => {
                      console.log("result", result);
                    },
                    (error) => {
                      console.log(error);
                    }
                  );
              }}
            >
              <Form>
                <Field
                  type="text"
                  className="input"
                  name="study_id"
                  required
                ></Field>
                <Field
                  type="text"
                  className="input"
                  name="availability_start"
                  required
                ></Field>
                <Field
                  type="text"
                  className="input"
                  name="availability_end"
                  required
                ></Field>
                <Field
                  type="text"
                  className="input"
                  name="description"
                  required
                ></Field>
                <Field
                  type="text"
                  className="input"
                  name="questions"
                  required
                ></Field>
                <button type="submit">SEND</button>
              </Form>
            </Formik>
          ) : (
            ""
          )}
        </div>
      );
    }
  }
}

AdminCampaigns.propTypes = {};

AdminCampaigns.defaultProps = {};

export default AdminCampaigns;
