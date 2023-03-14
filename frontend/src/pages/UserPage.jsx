import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import AddForm from "../components/AddForm";
import Navbar from "../components/Navbar";
import swal from 'sweetalert';
import Cookies from "js-cookie";
import Footer from "../components/Footer";

// --------------------------------Main Page starts from here-------------------------------
const UserPage = () => {
    const navigate = useNavigate();
    const dispUrl = "http://localhost:8080/display";
    const [img, setImg] = useState([]);
    const [empty, setEmpty] = useState(true);

    const token = Cookies.get('token');
    console.log("USERPAGE "+ token);

    const [isDeleted,setDeleted] = useState(false);

    const remove = (name) => {
        axios.delete(`http://localhost:8080/delete/${name}`)
        .then((response) => {
            if(response==='success') {
                setDeleted(true);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    

    useEffect(() => {
        isDeleted || 
        axios.get(dispUrl,{
            headers: { Authorization: `Bearer ${token}`}
        })
        .then((res) =>{
            if(isDeleted) {
                setDeleted(false);
            }
            let map = new Map();

            res.data.forEach((obj) => {
                const arrayBuffer = obj.img.data.data;
                const base64String = btoa(new Uint8Array(arrayBuffer).reduce(function (data, byte) {
                    return data + String.fromCharCode(byte);
                }, ''));
                const certObj = {
                    img : base64String,
                    certificateName : obj.certificateName,
                    creadentialId : obj.creadentialId,
                    group : obj.group
                }

                if (map.get(certObj.group)) {
                    map.get(certObj.group).push(certObj);
                } else {
                    map.set(certObj.group, [certObj]);
                }
            })

            console.log(map);
            setImg(map);
        }).catch((e) => {
            navigate("/login", { replace: true })
        })

        
    }, []);


    return (
        <div className="container">
            <Navbar/>
            <div className="cert-imgs">
                {  
                    Array.from(img.entries()).map((entry) => {
                        const [key, value] = entry
                        return (
                            <div className="group-card">
                                <h1>{key}</h1>
                                {
                                    value.map((obj) => {
                                        return (
                                            <div className="img-card">
                                                <img className="certificate" src={`data:image/png;base64,${obj.img}`} alt=""/>
                                                <p>Name : {obj.certificateName}</p>
                                                <p>Group : {obj.group}</p>
                                            </div>
                                        )  
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
            <AddForm/>
            <Footer/>
        </div>
    )
}
// -----------------------------------------------------------------------------------------

export default UserPage;