import React from "react";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";

const UserPage = (props) => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Welcome {props.user}</h1>
            <button onClick={() => navigate("/login",{replace:true})}>Logout</button>
        </div>    
    )
}

export default UserPage;