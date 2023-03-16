import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import AddForm from "../components/AddForm";
import Navbar from "../components/Navbar";
import EditForm from "../components/EditForm";
import swal from 'sweetalert';
import Cookies from "js-cookie";
import Footer from "../components/Footer";

// --------------------------------Main Page starts from here-------------------------------
const UserPage = () => {
    const navigate = useNavigate();
    const dispUrl = "http://localhost:8080/display";
    const [img, setImg] = useState([]);
    const [reload, setReload] = useState(0);

    const token = Cookies.get('token');
    console.log("USERPAGE "+ token);

    const [isDeleted,setDeleted] = useState(false);
    const [isEditable,setIsEditable] = useState(false);

    const remove = (name) => {
        axios.delete(`http://localhost:8080/delete/${name}`)
        .then((response) => {
            if(response==='success') {
                setDeleted(true);
            }
        }).catch((err) => {
            console.log(err);
        })
        setReload((pre) => pre+1);
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
                    userName: obj.userName,
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

        
    }, [reload]);

    const newState = (newState) => {
        setIsEditable(newState);
    }


    return (
        <>
        <Navbar/>
        <div className="container">        
            <div className="certificate-container">
                {  
                    Array.from(img.entries()).map((entry) => {
                        const [key, value] = entry
                        return (
                            <>
                            <h1>{key}</h1>
                            <div className="group-card">
                                
                                {
                                    value.map((obj) => {
                        
                                        return (

                                            <div className="certificate-card">
                                                <img className="certificate" src={`data:image/png;base64,${obj.img}`} alt=""/>
                                                <p><span> Name : </span>{obj.certificateName}</p>
                                                <p><span>Group :</span> {obj.group}</p>
                                                <button className = "danger-btn" onClick={() => remove(obj.certificateName)}>Delete</button>
                                                <button className = "danger-btn" onClick={() => setIsEditable(true)}>Edit</button>
                                                {isEditable && <EditForm data={obj} editState={isEditable} newState={newState}/>}
                                            </div>   
                                        )  
                                    })
                                }
                            </div>
                            </>
                        )
                    })
                }
                <AddForm/>
            </div>
              
                    
        </div>
        <Footer/>
        </>
    )
}
// -----------------------------------------------------------------------------------------

export default UserPage;