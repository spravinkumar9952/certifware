import axios from "axios";
import React from "react";
import Register from "./components/register/Register";
import Login from "./components/login/Login";

// Driver code
const url="http://localhost:8080/register";
const Main=()=> {
    const[registerRes,setRegisterRes]=useState("");

    // send registered details of user to server 
    const sendUserDetails = (userDetails) => {
        console.log(userDetails);
        axios.post(url,userDetails).
        then((response) => {

        })
    }

    // Parent
    return (
        <div>
            <Register onSubmit={sendUserDetails}/>
        </div>
    )
}

export default Main;