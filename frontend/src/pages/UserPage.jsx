import React from "react";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import Container from "../components/Container";
import Navbar from "../components/Navbar";


// --------------------------------Main Page starts from here-------------------------------
const UserPage = () => {
    const navigate = useNavigate();
    return (
        <div className="container">
            <Navbar/>
            <Container/>
        </div>
    )
}
// -----------------------------------------------------------------------------------------

export default UserPage;