import React, {useEffect, useReducer, useState} from "react";
import "./DashboardCampaigns.scss";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import {Button} from "react-bootstrap";

function askPermission(id) {
  const token = JSON.parse(sessionStorage.getItem("user")).access_token;
  fetch(
      process.env.REACT_APP_API + `/api/user/${id}/ask`,
      {
        method: "post",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${(token)}`,
          "Content-Type": "application/json",
        },
      }
  )
      .then((res) => res.json()).then(() => window.location.reload(false))
}


class DashboardCampaigns extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }

  componentDidMount() {
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
    const { error, isLoaded, items, sessions } = this.state;
    const token = JSON.parse(sessionStorage.getItem("user")).access_token;
    let countAvailabableCampaign = 0;
    let countWfaCampaign = 0;
    let countLockedCampaign = 0;

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
          <div className="spinner-grow" role="status">
            <span className="sr-only" />
          </div>
        </div>
      );
    } else {
      console.log(items)
      return (
        <div className="campaigns-list">
          <h2>Available campaigns</h2>
          {items.map((item) => {
            if(item.hasPermission) {
              countAvailabableCampaign++
              return (
                  <div key={item.id} className="campaign">
                    <h3 className="product-name">{item.product.name}</h3>
                    <div className="sessions-list">
                      {item.sessions.map((session) => {
                        console.log(session);
                        if (session.permissionGiven) {
                          return (
                              <div key={session.id} className="session-card">
                                <h4>Session #{session.id}</h4>
                                <p>
                                  <b>Description : </b>
                                  {session.description}
                                </p>
                                <p>
                                  <b>Date de début : </b>
                                  {session.availability_start}
                                </p>
                                <p>
                                  <b>Date de fin : </b>
                                  {session.availability_end}
                                </p>
                                {Date.parse(session.availability_start) <=
                                formattedCurrentDate &&
                                Date.parse(session.availability_end) >=
                                formattedCurrentDate ? (
                                    <Link
                                        to={`/study/${session.study_id}`}
                                        state={session.study_id}
                                    >
                                      Access <FaArrowRight />
                                    </Link>
                                ) : (
                                    ""
                                )}
                              </div>
                          );
                        }
                      })}
                    </div>
                  </div>
              );
            }


          })
          }
          { countAvailabableCampaign === 0 &&  (
            <div className="campaign">
            <p>No available campaign at this time, please select ask for one in the "Locked campaigns" section.</p>
            </div>
            )

          }
          <h2>Locked campaigns</h2>
          {items.map((item) => {
            if(!item.hasPermission && !item.askPermission) {
              countLockedCampaign++
              return (
                  <div key={item.id} className="campaign locked">
                    <h3 className="product-name">{item.product.name}</h3>
                    <Button onClick={() => askPermission(item.id)}>
                      Ask to participate
                    </Button>
                  </div>
              );
            }
          })}
          { countLockedCampaign === 0 &&  (
              <div className="campaign">
                <p>We can't offer you any new campaigns for the moment, thank you.</p>
              </div>
          )}
          <h2>Waiting for approval</h2>
          {items.map((item) => {
            if(!item.hasPermission && item.askPermission) {
              countWfaCampaign++
              return (
                  <div key={item.id} className="campaign waiting">
                    <h3 className="product-name">{item.product.name}</h3>
                    <Button>
                      Waiting for approval
                    </Button>
                  </div>
              );
            }
          })}
          {countWfaCampaign === 0 && (
              <div className="campaign">
                <p>No pending for approval campaign at this time, please select ask for one in the "Locked campaigns" section.</p>
              </div>
          )}
        </div>
      );
    }
  }
}

DashboardCampaigns.propTypes = {};

DashboardCampaigns.defaultProps = {};

export default DashboardCampaigns;
