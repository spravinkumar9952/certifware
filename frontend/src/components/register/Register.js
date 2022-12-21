import React from "react";
import { useState } from "react";

const Register = (props) => {
    const[email,setEmail]=useState("");
    const[userName,setUserName]=useState("");
    const[password,setPassword]=useState("");
    const[confirmPassword,setConfirmPassword]=useState("");


    const submit = (event) => {
        console.log("Submitted");
        event.preventDefault(); 
        const userDetails = {email,userName,password,confirmPassword};
        props.onSubmit(userDetails);
        
    }

    return (
        <div>
            <div>
                <form onSubmit={submit}>
                    <div>
                        <label>Email</label>
                        <input type="email" onChange={(event) => setEmail(event.target.value)}/>
                    </div>
                    <div>
                        <label>Username</label>
                        <input type="text" onChange={(event) => setUserName(event.target.value)}/>
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" onChange={(event) => setPassword(event.target.value)}/>
                    </div>
                    <div>
                        <label>Confirm Password</label>
                        <input type="password" onChange={(event) => setConfirmPassword(event.target.value)}/>
                    </div>
                    <button>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Register;
