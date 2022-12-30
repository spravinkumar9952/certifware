import React from "react";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";


// --------------------------------Main Page starts from here-------------------------------
const UserPage = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="Page">
                <Navbar/>
            </div>
        </div>
    )
}
// -----------------------------------------------------------------------------------------

export default UserPage;