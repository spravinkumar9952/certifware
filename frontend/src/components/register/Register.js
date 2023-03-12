import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import './Register.css'

const Register = (props) => {
    // states
    const[email,setEmail]=useState("");
    const[username,setUserName]=useState("");
    const[password,setPassword]=useState("");
    const[confirmPassword,setConfirmPassword]=useState("");

    // bind the user details and send to Main component
    const submit = (event) => {
        console.log("Submitted at registration");
        event.preventDefault(); 
        const userDetails = {email,username,password,confirmPassword};
        console.log(userDetails);
        props.onSubmit(userDetails);
    }

    return (
        <div className="register">
            <div>
                <form onSubmit={submit}>
                    <div className="field">
                        <label className="labl">Email</label>
                        <input type="email" onChange={(event) => setEmail(event.target.value)}/>
                    </div>
                    <div className="field">
                        <label className="labl">Username</label>
                        <input type="text" onChange={(event) => setUserName(event.target.value)}/>
                    </div>
                    <div className="field">
                        <label className="labl">Password</label>
                        <input type="password" onChange={(event) => setPassword(event.target.value)}/>
                    </div>
                    <div className="field">
                        <label className="labl">Confirm Password</label>
                        <input type="password" onChange={(event) => setConfirmPassword(event.target.value)}/>
                    </div>
                    <input type="submit" value="Register"/>
                    <h6>Already have an account</h6>
                    <Link to="/show">
                        <button>Show</button>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Register;