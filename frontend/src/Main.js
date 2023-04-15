import React from "react";
import axios from "axios";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import UserPage from "./pages/UserPage";
import { useState } from "react";
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom';
import  Cookies  from "js-cookie";



import "./style.scss"
import FindUser from "./pages/FindUser";

// URLs
const regUrl=`${process.env.REACT_APP_API_HOST}/register`;
// const regUrl=`http://localhost:8080/register`;
const loginUrl=`${process.env.REACT_APP_API_HOST}/login`;

// Driver code
const Main=()=> {

    // states
    console.log(regUrl);
    const[pathFromReg, setPathfromReg] = useState(false)
    const[pathFromLogin, setPathfromLogin] = useState("")
    let token = "";

    
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
            if(response.data.response==="fail") {
                setPathfromLogin("/login")
                alert("Invalid username or password");
                window.location.href="/login"
            } else {
                Cookies.set('token', response.data.token, { expires: 7 });
                console.log(Cookies.get('token'));
                setPathfromLogin("/UserPage")
                window.location.href="/userpage";
            }
            console.log(response);
        }).catch((err) => {
            console.log(err);
        })
    }
    // ---------------------------------------------------------------------------

    return (
        <div className="main-div">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Register onSubmit={sendRegUserDetails}/>}/>
                    <Route path="/login" element={<Login onSubmit={sendLoginUserDetails}/>}/>
                    <Route path="/userpage" element={<UserPage/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/findUser" element={<FindUser/>}/>
                </Routes>
            </BrowserRouter> 
        </div>
    )
}

export default Main;