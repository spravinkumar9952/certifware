import axios from "axios";
import React from "react";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import { useState } from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom';

// Driver code
const url="http://localhost:8080/register";
const Main=()=> {
    const[path, setPath] = useState("")

    // send registered details of user to server 
    const sendUserDetails = (userDetails) => {
        console.log(userDetails);
        axios.post(url,userDetails)
        .then((response) => {
            if(response.data.response==="success") {
                setPath("/login");
            }
            console.log(response);
        }).catch((err)=> {
            console.log(err);
        })
    }

    // Parent
    return (
        <div>
            <Register onSubmit={sendUserDetails}/>
            {console.log({path})};
            {/* <Route path="/" element={<Register onSubmit={sendUserDetails}/>}/>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login onSubmit={sendUserDetails}/>}/>
                </Routes>
            </BrowserRouter> */}
        </div>
    )
}

export default Main;