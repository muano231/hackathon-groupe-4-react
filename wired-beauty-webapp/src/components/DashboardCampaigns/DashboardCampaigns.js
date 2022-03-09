import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './DashboardCampaigns.scss';
import { Link } from 'react-router-dom';
import {FaArrowRight} from 'react-icons/fa';

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
    const token = JSON.parse(sessionStorage.getItem("user")).token
    fetch(
      "https://f781-2a04-cec0-106c-2e25-e559-b2dc-5ff0-7745.eu.ngrok.io/api/studies",
      {
        method: "get",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
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
      return <div>Chargement…</div>;
    } else {
      return (
        <div className='campaigns-list'>
          {items.map(item => (
            <div key={item.id} className='campaign'>
              <h3 className='product-name'>{item.product.name}</h3>
              <div className='sessions-list'>
                {item.sessions.map(session => {
                  return (
                    <div key={session.id} className='session-card'>
                      <h4>Session #{session.id}</h4>
                      <p><b>Description : </b>{session.description}</p>
                      {/* <p>{session.availability_start}</p> */}
                      <p><b>Date de fin : </b>{session.availability_end}</p>
                      <Link to={"/study/"+session.study_id}>
                        <button className='card-button'>
                            Participer <FaArrowRight/>
                        </button>
                      </Link>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )
    }
  }
}

DashboardCampaigns.propTypes = {};

DashboardCampaigns.defaultProps = {};

export default DashboardCampaigns;
