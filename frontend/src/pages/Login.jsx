import React from "react";
import {useState} from 'react';
import { Link } from "react-router-dom"; 

export const Login = (props) => {
    // states
    const[username,setUserName]=useState("")
    const[password,setPassword]=useState("")

    // bind the user details and send to Main component
    const submit = (event) => {
        console.log("Submitted at login");
        event.preventDefault();
        const loginDetails = {username,password};
        props.onSubmit(loginDetails);
    }
    return (
        <div className="auth">
                <form onSubmit={submit}>
                    
                    <h1>Login</h1>
                        <input type="text" placeholder="Username" onChange={(event) => setUserName(event.target.value)}/>
                    
                        <input type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)}/>
                    
                        <input type="submit" value="Login" className="button"/>

                    <span>Don't have an account? <Link to="/" className="link">
                        Signup
                    </Link></span>
                </form>
            
        </div>
    )
}

export default Login;