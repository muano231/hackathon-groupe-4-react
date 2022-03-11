import React, { useState } from "react";
import PropTypes from "prop-types";
import "./AdminCampaigns.scss";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaClipboardList,
  FaPencilAlt,
  FaPlus,
  FaThumbsDown,
  FaTrash,
} from "react-icons/fa";
import { Formik, Form, Field, isEmptyArray } from "formik";
import { Badge, Button } from "react-bootstrap";
import { IoMdWifi } from "react-icons/io";
import Thumb from "../Thumb/Thumb";

class AdminCampaigns extends React.Component {
  currentDate = new Date();

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      createNewSession: false,
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

  render() {
    const { error, isLoaded, items, createNewSession } = this.state;

    const current = new Date();
    const currentDate = `${current.getFullYear()}-${
      current.getMonth() + 1
    }-${current.getDate()}`;
    const formattedCurrentDate = Date.parse(currentDate);

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
      console.log(items);
      return (
        <div className="campaigns-list">
          <div className="addCampaignContainer">
            <Button
              className="addCampaign"
              onClick={(e) => this.setState({ createNewSession: true })}
            >
              Create new session
              <FaPlus />
            </Button>
          </div>
          {items.map((item) => (
            <div key={item.id} className="campaign">
              <div className="campaignHeading">
                <h3 className="product-name">{item.product.name}</h3>
                <div className="sessionsActionContainer">
                  <Link to="/admin/verify-users">
                    <Button className="new-users-button">
                      <FaPencilAlt />
                    </Button>
                  </Link>
                  <Link to="/admin/verify-users">
                    <Button className="new-users-button">
                      <FaTrash />
                    </Button>
                  </Link>
                  <Link to="/admin/verify-users">
                    <Button className="new-users-button">
                      <FaPlus />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="sessions-list">
                {!isEmptyArray(item.sessions) ? (
                  item.sessions.map((session) => {
                    return (
                      <div key={session.id} className="session-card">
                        {formattedCurrentDate &&
                        Date.parse(session.availability_end) >=
                          formattedCurrentDate ? (
                          <div className="liveContainer">
                            <IoMdWifi />
                          </div>
                        ) : (
                          ""
                        )}
                        <h4>Session #{session.id}</h4>
                        <p>
                          <b>Description : </b>
                          {session.description}
                        </p>
                        {/* <p>{session.availability_start}</p> */}
                        <p>
                          <b>Start date: </b>
                          {session.availability_start}
                        </p>
                        <p>
                          <b>End date: </b>
                          {session.availability_end}
                        </p>
                        {/* <Link
                        to={"/study/" + session.study_id}
                        state={session.study_id}
                      > */}
                        <div className="sessionActionContainer">
                          <Link
                            to={"/study/" + session.study_id}
                            state={session.study_id}
                          >
                            Modify
                          </Link>
                          <Link
                            to={"/study/" + session.study_id}
                            state={session.study_id}
                          >
                            Delete
                          </Link>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p>No session available, please create one.</p>
                )}
              </div>
            </div>
          ))}
          {createNewSession ? (
            <Formik
              initialValues={{
                study_id: null,
                availability_start: "",
                availability_end: "",
                description: "",
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
              render={({ values, handleSubmit, setFieldValue }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>Study id</label>
                      <Field
                        type="number"
                        className="input"
                        name="study_id"
                        required
                      />
                      <label>Start date</label>
                      <Field
                        type="text"
                        className="input"
                        name="availability_start"
                        required
                      />
                      <label>End date</label>
                      <Field
                        type="text"
                        className="input"
                        name="availability_end"
                      />
                      <label>Description</label>
                      <Field
                        type="text"
                        className="input"
                        name="description"
                        required
                      />
                      <label>File upload</label>
                      <Field
                        id="file"
                        name="questions"
                        type="file"
                        className="input"
                        onChange={(event) => {
                          setFieldValue("file", event.currentTarget.files[0]);
                        }}
                      />
                      <Thumb file={values.questions} />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </form>
                );
              }}
            />
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
