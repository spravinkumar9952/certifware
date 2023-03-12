import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Logo from "../images/logo.png"


const Navbar = () => {
    const navigate = useNavigate();

    return (
        <div className="nav-bar">

            <div className="logo">
                <img className = "logo-img"src={Logo} alt="" />
            </div>
            
            <div className="nav-links">
                <button className="danger-btn" onClick={() => navigate("/login", { replace: true })}>Logout</button>
            </div>
        </div>
    )
}

export default Navbar;
