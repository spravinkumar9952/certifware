import React from "react";
import {useState} from 'react';
import { Link } from "react-router-dom";    

const Login = (props) => {
    // states
    const[userName,setUserName]=useState("")
    const[password,setPassword]=useState("")

    // bind the user details and send to Main component
    const submit = (event) => {
        console.log("Submitted at login");
        event.preventDefault();
        const loginDetails = {userName,password};
        props.onSubmit(loginDetails);
    }
    return (
        <div className="login">
            <div>
                <form onSubmit={submit}>
                    <div className="field">
                        <label  className="labl">Username</label>
                        <input type="text" onChange={(event) => setUserName(event.target.value)}/>
                    </div>
                    <div className="field">
                        <label  className="labl">Password</label>
                        <input type="password" onChange={(event) => setPassword(event.target.value)}/>
                    </div>
                    <button>Submit</button>
                    <h1></h1>
                    <Link to="/">
                        <button>Signup</button>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Login;