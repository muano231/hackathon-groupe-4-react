import React from "react";
import PropTypes from "prop-types";
import "./Test.scss";
import { Form } from "react-bootstrap";

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }

  componentDidMount() {
    const token = JSON.parse(sessionStorage.getItem("user")).toaccess_tokenken
    fetch(
      "http://f781-2a04-cec0-106c-2e25-e559-b2dc-5ff0-7745.eu.ngrok.io/api/sessions/1",
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
            items: Array.of(result),
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
  // handleSubmit = (event) => {
  //   //Prevent page reload
  //   event.preventDefault();
  //   var { email, pass } = document.forms[0];
  //   // Find user login info
  //   // const userData = database.find((user) => user.email === email.value);
  //   // // Compare user info
  //   // if (userData) {
  //   //   if (userData.password !== pass.value) {
  //   //     // Invalid password
  //   //     setErrorMessages({ name: "pass", message: errors.error });
  //   //   } else {
  //   //     setIsSubmitted(true);
  //   //   }
  //   // } else {
  //   //   // Email not found
  //   //   setErrorMessages({ name: "email", message: errors.error });
  //   // }
  // };
  render() {
    const { error, isLoaded, items } = this.state;
    // console.log(this.state);
    console.log(items);
    // renvoyer un tableau  session id qui contient question id et valeur id
    if (error) {
      return <div>Erreur : {error}</div>;
    } else if (!isLoaded) {
      return <div>Chargement…</div>;
    } else {
      return (
        <div className="container">
          <div className="login-form">
            <div className="title"></div>
            <div className="form">
              <form>
                {items.map((item) => (
                  <div className="input-container" key={item.id}>
                    <h1 className="title">{item.description}</h1>
                    {item.questions.map((question) => (
                      <div key={question.id}>
                        <label className="p-2">{question.question}</label>
                        <Form.Select aria-label="Default select example">
                          {question.answers.map((answer) => (
                            <option>{answer.answer}</option>
                          ))}
                        </Form.Select>
                      </div>
                    ))}
                  </div>
                ))}
                <div className="button-container">
                  <button type="submit">SEND</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }
  }
}

Test.propTypes = {};

Test.defaultProps = {};

export default Test;
