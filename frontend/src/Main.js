import axios from "axios";
import React from "react";
import Register from "./components/register/Register";

// Driver code
const url="http://localhost:8080/register";
const Main=()=> {
    const sendUserDetails = (userDetails) => {
        console.log(userDetails);
        axios.post(url,userDetails).then((response) => {
            console.log(response);
        })
    }

    return (
        <div>
            <Register onSubmit={sendUserDetails}/>
        </div>
    )
}

export default Main;