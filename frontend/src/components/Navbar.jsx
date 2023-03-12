import React, { useState } from "react";
import Container from "./Container"
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

import Cookies from "js-cookie";


const Navbar = () => {
    const navigate = useNavigate();

    const logoutHandler = () =>{
        // axios.get("http://localhost:8080/logout")
        // .then().catch()
        Cookies.remove("token");
        navigate("/login", { replace: true })
    }

    return (
        <div className="nav-bar">
            <div className="logo">
                <h1>Certifware</h1>
            </div>
            
            <div className="nav-links">
                <button className="danger-btn" onClick={() => logoutHandler() }>Logout</button>
            </div>
        </div>
    )
}

export default Navbar;
