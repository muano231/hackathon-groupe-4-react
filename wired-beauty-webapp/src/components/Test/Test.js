import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./Test.scss";
import { Formik, Field, Form } from "formik";
import { useLocation } from "react-router-dom";
// import ModalBox from "../Modal/Modal";
import DashboardMenu from "../DashboardMenu/DashboardMenu";
import DashboardProfile from "../DashboardProfile/DashboardProfile";
import DashboardCampaigns from "../DashboardCampaigns/DashboardCampaigns";

function Test(props) {
  const [items, setItems] = useState([]);

  // recuperation de l'id de la session de la page précedente (onClick)
  // var items = useState([]);
  const location = useLocation();
  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("user")).access_token;
    fetch(process.env.REACT_APP_API + `/api/sessions/${location.state}`, {
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
          setItems(Array.of(result));
        },
        (error) => {
          console.log(error);
        }
      );
  });

  return (
    <div>
      <DashboardMenu />
      <div className="content">
        <div className="study-form">
          <Formik
            initialValues={{}}
            onSubmit={async (values) => {
              // renvoyer un tableau  session id qui contient question id et valeur id
              const token = JSON.parse(
                sessionStorage.getItem("user")
              ).access_token;

              var transformedValues = Object.entries(values).map((value) => ({
                question_id: value[0],
                answer_id: value[1],
              }));
              const data = {
                address: "Sciences-U",
                session_id: location.state,
                answers: transformedValues,
              };
              fetch(process.env.REACT_APP_API + "/api/tests", {
                method: "post",
                body: JSON.stringify(data),
                headers: {
                  Accept: "application/json",
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              })
                .then((res) => res.json())
                .then((result) => {
                  console.log("success", result);
                });
            }}
          >
            <div className="form">
              <Form>
                {items.map((item) => (
                  <>
                    <h1 className="title">{item.description}</h1>
                    <div className="input-container" key={item.id}>
                      {item.questions.map((question) => (
                        <div key={question.id}>
                          <label className="p-2">{question.question}</label>
                          <Field
                            component="select"
                            name={question.id}
                            required
                            className="form-select"
                          >
                            {question.answers.map((answer) => (
                              <option key={answer.id} value={answer.value}>
                                {answer.answer}
                              </option>
                            ))}
                          </Field>
                        </div>
                      ))}
                    </div>
                  </>
                ))}
                <div className="button-container">
                  <button type="submit">SEND</button>
                </div>
              </Form>
            </div>
          </Formik>
        </div>
      </div>
    </div>
  );
}

Test.propTypes = {};

Test.defaultProps = {};

export default Test;
