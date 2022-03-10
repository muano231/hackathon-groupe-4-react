import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./Test.scss";
import { Formik, Field, Form } from "formik";
import { useLocation } from "react-router-dom";
import ModalBox from "../Modal/Modal";

function Test(props) {
  const [items, setItems] = useState([]);

  // recuperation de l'id de la session de la page précedente (onClick)
  // var items = useState([]);
  const location = useLocation();
  // console.log("location", location);
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
    <div className="container">
      <div className="login-form">
        <div className="title"></div>
        <Formik
          initialValues={{}}
          onSubmit={async (values) => {
            // renvoyer un tableau  session id qui contient question id et valeur id
            console.log(values);
            const token = JSON.parse(
              sessionStorage.getItem("user")
            ).access_token;

            var transformedValues = Object.entries(values).map((value) => ({
              question_id: value[0],
              answer_id: value[1],
            }));
            console.log("transformedValues", transformedValues);
            const data = {
              address: "Sciences-U",
              session_id: location.state,
              answers: transformedValues,
            };
            console.log("data", data);
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
              .then(
                (result) => {
                  console.log("success", result);
                },
                (error) => {
                  console.log(error);
                }
              );
          }}
        >
          <div className="form">
            <Form>
              {items.map((item) => (
                <div className="input-container" key={item.id}>
                  <h1 className="title">{item.description}</h1>
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
              ))}
              <div className="button-container">
                <button type="submit">SEND</button>
              </div>
            </Form>
          </div>
        </Formik>
      </div>
    </div>
  );
}

Test.propTypes = {};

Test.defaultProps = {};

export default Test;
