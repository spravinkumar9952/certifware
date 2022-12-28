import React from "react";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import MainPage from "../mainpage/MainPage";

const UserPage = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="Page">
                <Navbar/>
                <button onClick={() => navigate("/login",{replace:true})}>Logout</button>
            </div>
            <div>
                <MainPage/>
            </div>
        </div>
    )
}

export default UserPage;