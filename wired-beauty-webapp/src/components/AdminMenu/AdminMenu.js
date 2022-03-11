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
        .then((res) => res.text())
        .then(
            (result) => {
                var parser = new DOMParser();
                var doc = parser.parseFromString(result, "text/html");
                setPDF(doc)
                console.log(doc);
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
                            <a onClick={downloadPDF}>export PDF</a>
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
