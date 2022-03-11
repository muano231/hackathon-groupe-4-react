import React, { Component, useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./AdminMenu.scss";
import logo from "../../assets/logo.png";
import {FaPowerOff, FaClipboardList, FaFilePowerpoint, FaUserCircle} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Badge, Button } from "react-bootstrap";

function AdminMenu() {
    const [PDF, setPDF] = useState()
    const token = JSON.parse(sessionStorage.getItem("user")).access_token;
    
    const downloadPDF = () => {
        fetch(
            process.env.REACT_APP_API + "/api/pdf_download",
            {
                method: "get",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            }
        )
        .then((res) => res.arrayBuffer())
        .then(
            (result) => {
                const link = document.createElement('a');
                // create a blobURI pointing to our Blob
                link.href = URL.createObjectURL(new Blob([result]));
                link.download = "report.pdf";
                // some browser needs the anchor to be in the doc
                document.body.append(link);
                link.click();
                link.remove();
                // in case the Blob uses a lot of memory
                setTimeout(() => URL.revokeObjectURL(link.href), 7000);
                // var parser = new DOMParser();
                // var doc = parser.parseFromString(result, "text/html");
                // setPDF(doc)
                // console.log(doc);
            },
            (error) => {
                setPDF({
                    isLoaded: true,
                    error,
                });
            }
        );
    }

    const logout = () => {
        sessionStorage.clear();
    };

    return (
        <div className="dashboard-menu">
            <div className="menu_container">
                <div>
                    <Link to="/admin/campaigns">
                        <img src={logo} alt="Logo" className="logo-menu" />
                    </Link>
                    <ul>
                        <li>
                            <Link to="/admin/campaigns">campaigns</Link>
                        </li>
                        <li>
                            <Link to="/admin/verify-users">users</Link>
                        </li>
                        <li>
<<<<<<< HEAD
                            <Link to="#" onClick={downloadPDF}>export PDF</Link>
=======
                            <a onClick={downloadPDF}>export PDF</a>
>>>>>>> de34aa11c32570b20b1d6911e61a410c5f129a29
                        </li>
                    </ul>
                </div>
                <div className="actionContainer">
                    <Link to="/admin/verify-users">
                        <Button className='new-users-button'>
                            <FaClipboardList /> <Badge bg="secondary">9</Badge>
                        </Button>
                    </Link>
                    <p onClick={logout} className="logout-button">
                        <Link to="/" className="logout-fa">
                            <FaPowerOff />
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}


export default AdminMenu;
