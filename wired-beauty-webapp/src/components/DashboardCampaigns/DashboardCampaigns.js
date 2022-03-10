import React from "react";
import "./DashboardCampaigns.scss";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

class DashboardCampaigns extends React.Component {
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
      return (
        <div className="campaigns-list">
          {items.map((item) => {
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
                              Participer <FaArrowRight />
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
          })}
        </div>
      );
    }
  }
}

DashboardCampaigns.propTypes = {};

DashboardCampaigns.defaultProps = {};

export default DashboardCampaigns;
