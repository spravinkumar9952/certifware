import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Logo from "../images/logo.png"
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
                <img className = "logo-img"src={Logo} alt="" />
            </div>
            
            <div className="nav-links">
                <Link to='/profile'>
                    Profile
                </Link>
                <button className="danger-btn" onClick={() => logoutHandler() }>Logout</button>
            </div>
        </div>
    )
}

export default Navbar;
