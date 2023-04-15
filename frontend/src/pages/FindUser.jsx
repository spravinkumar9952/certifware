import axios from 'axios';
import React from 'react'
import { Route, useLocation} from 'react-router-dom';
import Cookies from 'js-cookie';
import { useEffect  } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AddForm from '../components/AddForm';
import AnonymousNavBar from '../components/AnonymousNavBar';



export default function FindUser() {
    const navigate = useNavigate();
    const {state}  = useLocation();
    const {findUser} = state;

    const dispUrl = `${process.env.REACT_APP_API_HOST}/display`;
    const [img, setImg] = useState([]);
    const token = Cookies.get('token');

    useEffect(() => {
       
        
        console.log(findUser);
        axios.get(`${process.env.REACT_APP_API_HOST}/findUser/${findUser}`,{
            headers: { Authorization: `Bearer ${token}`}
        })
        .then((res) =>{
            
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

            setImg(map);
        }).catch((e) => {
            navigate("/login", { replace: true })
        })

    }, [state])

    const backToHome = () =>{
        navigate("/userPage", {replace: true})
    }

    return (
        <>
        <AnonymousNavBar/>
        <div className="container">
            
            <button onClick={() => backToHome()} className="button">Back To Home</button>
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
                                            </div>
                                        )  
                                    })
                                }
                            </div>
                            </>
                        )
                    })
                }
            </div>
            
        </div>
        <Footer/>
        </>
    )
}
