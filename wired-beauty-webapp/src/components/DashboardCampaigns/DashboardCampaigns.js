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
    fetch(
      'http://f230-2a04-cec0-106c-2e25-a7f1-ead9-2116-632.eu.ngrok.io/api/studies'
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
              <hr />
              <div className='sessions-list'>
                {item.sessions.map(session => {
                  return (
                    <div key={session.id} className='session-card'>
                      <h4>Session #{session.id}</h4>
                      <p>Description : {session.description}</p>
                      {/* <p>{session.availability_start}</p> */}
                      <p>Date de fin : {session.availability_end}</p>
                      <button>
                        <Link to={"/study/"+session.study_id}>
                          Participer <FaArrowRight/>
                        </Link>
                      </button>
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
