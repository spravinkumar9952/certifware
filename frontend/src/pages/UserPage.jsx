import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import AddForm from "../components/AddForm";
import Navbar from "../components/Navbar";
import swal from 'sweetalert';
import Cookies from "js-cookie";


// --------------------------------Main Page starts from here-------------------------------
const UserPage = () => {
    const navigate = useNavigate();
    const dispUrl = "http://localhost:8080/display";
    const [img, setImg] = useState([]);
    const token = Cookies.get('token');
    console.log("USERPAGE "+ token);
    

    useEffect(() => {
        axios.get(dispUrl,{
            headers: { Authorization: `Bearer ${token}`}
        })
        .then((res) =>{
            const baseStrArr = res.data.map((obj) => {
                const arrayBuffer = obj.img.data.data;
                const base64String = btoa(new Uint8Array(arrayBuffer).reduce(function (data, byte) {
                    return data + String.fromCharCode(byte);
                }, ''));
                return base64String;
            })
            setImg(baseStrArr);
        }).catch((e) => {
            console.log("Disp Error", e);
            navigate("/login", { replace: true })
        })

        
    }, []);

    return (
        <div className="container">
            
            <Navbar/>

            
                
            
            
            <div className="cert-imgs">
                {
                    img.map((obj) => {
                        return <img className="certificate" src={`data:image/png;base64,${obj}`} alt=""/>
                    })
                }
            </div>
            
            <AddForm/>
        </div>
    )
}
// -----------------------------------------------------------------------------------------

export default UserPage;