import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Logo from "../images/logo.png"
import axios from "axios";

import Cookies from "js-cookie";


const Navbar = () => {
    const navigate = useNavigate();
    const [findUser, setFindUser] = useState("");

    const logoutHandler = () =>{
        Cookies.remove("token");
        navigate("/login", { replace: true })
    }

    const handleSubmit = () => {
        console.log(findUser);
        navigate("/findUser", { replace: true, state : {findUser : findUser}});
    }

    return (
        <div className="nav-bar">

            <div className="logo">
                <img className = "logo-img"src={Logo} alt="" />
            </div>
            
            <div className="nav-links">
                <div>
                    <input placeholder="Search the user" onChange={(event) => setFindUser(event.target.value)}/>

                    <button onClick={() => handleSubmit()}>Search</button>
                </div>
                
                <Link to='/profile' className="link">
                    Profile
                </Link>
                <button className="danger-btn" onClick={() => logoutHandler() }>Logout</button>
            </div>
        </div>
    )
}

export default Navbar;
