import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = (props) => {
    // states
    const [email, setEmail] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // bind the user details and send to Main component
    const submit = (event) => {
        console.log("Submitted at registration");
        event.preventDefault();
        const userDetails = { email, username, password, confirmPassword };
        console.log(userDetails);
        props.onSubmit(userDetails);
    }

    return (
        <div className="auth">
            
            <form onSubmit={submit}>
                <h1>Register</h1>

                <input type="email" placeholder="Email" onChange={(event) => setEmail(event.target.value)} />


                <input type="text" placeholder="Username" onChange={(event) => setUserName(event.target.value)} />



                <input type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />

                <input type="password" placeholder="Confirm Password" onChange={(event) => setConfirmPassword(event.target.value)} />

                <input type="submit" value="Register" className="button"/>

                <span>Already have an account? <Link to="/login" className="link">
                    Login
                </Link></span>
            </form>
        </div>
    )
}

export default Register;
