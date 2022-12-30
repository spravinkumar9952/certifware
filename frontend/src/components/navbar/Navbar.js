import React, { useState } from "react"; 
import Container from "./navabarcomponents/container/Container"
import { Navigate, useNavigate } from "react-router-dom";
// import "./Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();
    
    return (
        <div className="NavigationBar">
            <div className="Page">
                <ul>
                    {/* Title */}
                    <li style={{listStyleType:"none"}}>
                        <h1>Navigation Bar</h1>
                    </li>

                    {/* Search Component
                    <li>

                    </li> */}

                    {/* Group Container */}
                    <li style={{listStyleType:"none"}}>
                        <Container/>
                    </li>

                    {/* Settings Component
                    <li>

                    </li> */}

                    {/* Profile Component
                    <li>

                    </li> */}

                    {/* Logout */}
                    <li style={{listStyleType:"none"}}>
                        <button onClick={() => navigate("/login",{replace:true})}>Logout</button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;
