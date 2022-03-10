import React, {useEffect, useReducer, useState} from "react";
import {useNavigate} from "react-router-dom";
import "./DashboardProfile.scss";
import {Formik, Field, Form} from "formik";
import {FaArrowAltCircleLeft} from "react-icons/fa";

function DashboardProfile() {
    let navigate = useNavigate();
    /* const Calculate_age = () => {
       var today = new Date();
       var birthdate = new Date(Users[0].birthdate);
       var age = today.getFullYear() - birthdate.getFullYear();
       var m = today.getMonth() - birthdate.getMonth();
       if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
         age--;
       }
       return age;
     };*/

    const [user, setUser] = useState([])
    const token = JSON.parse(sessionStorage.getItem("user")).access_token;

    useEffect(() => {
        fetch(
            process.env.REACT_APP_API + "/api/user",
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
                    setUser(result)
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                }
            );
    }, []);


    return (
        <div className="profile">
            <div className="Heading">
                <a onClick={() => navigate(-1)}>
                    <FaArrowAltCircleLeft className="icon-return" size={35}/>
                </a>
                <h3>Profile</h3>
            </div>

            {/* <div> */}
            <Formik
                // initialValues={{
                //   name: Users[0].name,
                //   height: Users[0].height,
                //   email: Users[0].email,
                //   weight: Users[0].weight,
                //   birthdate: Users[0].birthdate,
                // }}
                onSubmit={async (values) => {
                    await new Promise((resolve) => setTimeout(resolve, 500));
                    alert(JSON.stringify(values, null, 2));
                }}
            >
                <Form className="form-profile">
                    <div className="user-informations">
                        <div>
                            <span className="bold">Name</span>
                            <Field name="name" type="text" placeholder={user.name}/>
                        </div>
                        <div>
                            <span className="bold">Email</span>
                            <Field name="email" type="email" placeholder={user.email}/>
                        </div>
                        <div>
                            <span className="bold">Age</span>
                            <Field name="birthdate" type="text" placeholder={user.age}/>
                        </div>
                        <div>
                            <span className="bold">Height</span>
                            <Field name="height" type="number" placeholder={user.height}/>
                        </div>
                        <div>
                            <span className="bold">Weight</span>
                            <Field name="weight" type="number" placeholder={user.weight}/>
                        </div>
                    </div>
                    <div className="button-container">
                        <button type="submit">MODIFY</button>
                    </div>
                </Form>
            </Formik>

            {/* <p><b>Name : </b>{Users[0].name}</p>
        <p><b>Height : </b>{Users[0].height} cm</p>
        <p><b>Email : </b>{Users[0].email}</p>
        <p><b>Weight : </b>{Users[0].weight} kg</p>
        <p><b>Age : </b>{Calculate_age()}</p> */}
        </div>
    );
}

export default DashboardProfile;
