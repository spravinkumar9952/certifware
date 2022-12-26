import axios from "axios";
import React from "react";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import { useState } from "react";
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom';



// URLs
const regUrl="http://localhost:8080/register";
const loginUrl="http://localhose:8080/login";



// Driver code
const Main=()=> {
    // states
    const[pathFromReg, setPathfromReg] = useState("")
    const[pathFromLogin, setPathfromLogin] = useState("")

    // send registered details of user to server 
    const sendRegUserDetails = (userDetails) => {
        console.log("Registered details: "+userDetails)
        axios.post(regUrl,userDetails)
        .then((response) => {
            if(response.data.response==="success") {
                setPathfromReg("/login");
            }
            console.log("Response: "+response);
        }).catch((err)=> {
            console.log(err);
        })
    }

    // send logged in details of user to server 
    const sendLoginUserDetails = (userDetails) => {
        console.log("Login details: "+userDetails);
        axios.post(loginUrl,userDetails)
        .then((response) => {
            if(response.data.response==="success") {
                setPathfromLogin()
            }
            console.log("Response: "+response);
        }).catch((err) => {
            console.log(err);
        })
    }


    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Register onSubmit={sendRegUserDetails}/>}/>
                    <Route path="/login" element={<Login onSubmit={sendLoginUserDetails}/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Main;