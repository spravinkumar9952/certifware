import React, { useState } from "react";
import Container from "./Container"
import { Navigate, useNavigate } from "react-router-dom";


const Navbar = () => {
    const navigate = useNavigate();

    return (
        <div className="nav-bar">
            <div className="logo">
                <h1>Certifware</h1>
            </div>
            
            <div className="nav-links">
            <button className="logout-btn" onClick={() => navigate("/login", { replace: true })}>Logout</button>
            </div>
        </div>
    )
}

export default Navbar;
