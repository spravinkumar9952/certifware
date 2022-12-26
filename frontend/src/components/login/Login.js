import React from "react";
import {useState} from 'react';

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
                    <div>
                        <label>Username</label>
                        <input type="text" onChange={(event) => setUserName(event.target.value)}/>
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" onChange={(event) => setPassword(event.target.value)}/>
                    </div>
                    <button>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Login;