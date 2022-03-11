import React from "react";
import "./AdminCampaigns.scss";
import { Link } from "react-router-dom";
import {

  FaPencilAlt,
  FaPlus,
  FaThumbsDown, FaTimes,
  FaTrash,
} from "react-icons/fa";
import { Formik, Form, Field, isEmptyArray } from "formik";
import {  Button } from "react-bootstrap";
import { IoMdWifi } from "react-icons/io";
import Thumb from "../Thumb/Thumb";

const token = JSON.parse(sessionStorage.getItem("user")).access_token;


function deleteSession(id) {
  fetch(process.env.REACT_APP_API + "/api/sessions/" + id, {
    method: "delete",
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
      ).then(() => window.location.reload(false))
}

function deleteCampaign(id) {
  fetch(process.env.REACT_APP_API + "/api/studies/" + id, {
    method: "delete",
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
      ).then(() => window.location.reload(false))
}

class AdminCampaigns extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      createNewSession: false,
      createNewCampaign: false,
    };
  }

  componentDidMount() {
    // console.log(JSON.parse(sessionStorage.getItem("user")));
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
    const { error, isLoaded, items, createNewSession, createNewCampaign } = this.state;

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
              onClick={(e) => this.setState({ createNewCampaign: true })}
            >
              Create new campaign
              <FaPlus />
            </Button>
          </div>
          {items.map((item) => (
            <div key={item.id} className="campaign">
              <div className="campaignHeading">
                <h3 className="product-name">{item.product.name}</h3>
                <div className="sessionsActionContainer">
                  <a>
                    <Button className="new-users-button" onClick={() => deleteCampaign(item.id)}>
                      <FaTrash />
                    </Button>
                  </a>
                  <a>
                    <Button className="new-users-button" onClick={(e) => this.setState({ createNewSession: true, campaignIdNewSession: item.id })}>
                      <FaPlus />
                    </Button>
                  </a>
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
<<<<<<< HEAD
                          <Link
                            to={"/admin/study/" + session.study_id}
                            state={{
                              study_id: session.study_id,
                              product_id: 1,
                            }}
                          >
                            Modify
                          </Link>
                          <Link
                            to={"/study/" + session.study_id}
                            state={session.study_id}
=======
                          <Button className="deleteButton" onClick={() => deleteSession(session.id)}
>>>>>>> de34aa11c32570b20b1d6911e61a410c5f129a29
                          >
                            Delete
                          </Button>
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
          <div className="addCampaignContainer">
            <Button
                className="addCampaign"
                onClick={(e) => this.setState({ createNewCampaign: true })}
            >
              Create new campaign
              <FaPlus />
            </Button>
          </div>
          {createNewSession ? (
              <div className="newSessionModal">
                <div className="newSessionModalContainer">
                  <Formik
                      initialValues={{
                        study_id: this.state.campaignIdNewSession,
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
                            ).then(() => window.location.reload(false))
                      }}
                  render={({ values, handleSubmit, setFieldValue }) => {
                return (
                    <form onSubmit={handleSubmit}>
                      <Button onClick={() => {this.setState({createNewSession:false})}}>
                        Annuler
                      </Button>
                      <h2>Add session</h2>
                    <div className="form-group">
                      <label>Study Id</label>
                      <Field
                          type="number"
                          className="input"
                          name="study_id"
                          value={this.state.campaignIdNewSession}
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
                      Submit</button>
                    </form>
                  );
              }}
            />
                </div>
              </div>
          ) : (
            ""
          )}
          {createNewCampaign ? (
              <div className="newCampaignModal">
                <div className="newCampaignModalContainer">
                  <Formik
                      initialValues={{
                        study_id: this.state.campaignIdNewSession,
                        availability_start: "",
                        availability_end: "",
                        description: "",

                      }}
                      onSubmit={async (values) => {
                        console.log(values);
                        const token = JSON.parse(
                            sessionStorage.getItem("user")
                        ).access_token;
                        fetch(process.env.REACT_APP_API + "/api/studies", {
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
                            ).then(() => window.location.reload(false))
                      }}
                      render={({ values, handleSubmit, setFieldValue }) => {
                        return (
                            <form onSubmit={handleSubmit}>
                              <Button onClick={() => {this.setState({createNewCampaign:false})}}>
                                Annuler
                              </Button>
                              <h2>Add session</h2>
                              <div className="form-group">
                                <label>Campaign Name</label>
                                <Field
                                    type="text"
                                    className="input"
                                    name="product"
                                    required
                                />
                              </div>
                              <button type="submit" className="btn btn-primary">
                                Submit</button>
                            </form>
                        );
                      }}
                  />
                </div>
              </div>
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
