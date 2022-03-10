import React, { useState } from "react";
import PropTypes from "prop-types";
import "./AdminCampaigns.scss";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

class AdminCampaigns extends React.Component {
  currentDate = new Date();

  constructor(props) {
    super(props);
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
                        <b>Date de fin : </b>
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
                        <button className="card-button">
                          Participer <FaArrowRight />
                        </button>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      );
    }
  }
}

AdminCampaigns.propTypes = {};

AdminCampaigns.defaultProps = {};

export default AdminCampaigns;
