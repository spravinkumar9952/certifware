import React from "react";
import axios from "axios";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import UserPage from "./components/userPage/UserPage";
import { useState } from "react";
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom';

// URLs
const regUrl="http://localhost:8080/register";
const loginUrl="http://localhost:8080/login";

// Driver code
const Main=()=> {

    // states
    const[pathFromReg, setPathfromReg] = useState(false)
    const[pathFromLogin, setPathfromLogin] = useState("")

    
    // ---------------------------send registered details of user to server--------
    const sendRegUserDetails = (userDetails) => {
        // console.log(userDetails)
        // user = userDetails;
        axios.post(regUrl,userDetails)
        .then((response) => {
            if(response.data.response==="success") {
                setPathfromReg("/login");
                window.location.href="/login";
            } else {
                alert("Username already exists");
                window.location.href="/";
            }
            console.log(response);
        }).catch((err)=> {
            console.log("err");
            console.log(err);
        })
    }
    // ---------------------------------------------------------------------------


    // ----------------send logged in details of user to server-------------------
    const sendLoginUserDetails = (userDetails) => {
        console.log(userDetails);
        axios.post(loginUrl,userDetails)
        .then((response) => {
            if(response.data.response==="success") {
                setPathfromLogin("/UserPage")
                window.location.href="/userpage"
            } else {
                setPathfromLogin("/login")
                alert("Invalid username or password");
                window.location.href="/login"
            }
            console.log(response);
        }).catch((err) => {
            console.log(err);
        })
    }
    // ---------------------------------------------------------------------------

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Register onSubmit={sendRegUserDetails}/>}/>
                    <Route path="/login" element={<Login onSubmit={sendLoginUserDetails}/>}/>
                    <Route path="/userpage" element={<UserPage/>}/>
                </Routes>
            </BrowserRouter> 
        </div>
    )
}

export default Main;