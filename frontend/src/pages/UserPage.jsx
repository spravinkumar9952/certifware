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

    const remove = async (name) => {
        console.log(name);
        try {
          const response = await axios.delete(`http://localhost:8080/delete/${name}`);
          console.log(response.data); // log response data
        } catch (error) {
          console.error(error);
        }
    };

    // const remove = (name) => {
    //     console.log(name);
        // axios.delete('http://localhost:8080/delete/'+name)
        // .then((response) => {
        //     if(response==='success') {
        //         setDeleted(true);
        //     }
        // }).catch((err) => {
        //     console.log(err);
        // })
    //}
    

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
            
            const baseStrArr = res.data.map((obj) => {
                const arrayBuffer = obj.img.data.data;
                const base64String = btoa(new Uint8Array(arrayBuffer).reduce(function (data, byte) {
                    return data + String.fromCharCode(byte);
                }, ''));
                return {
                    img : base64String,
                    certificateName : obj.certificateName,
                    creadentialId : obj.creadentialId,
                    group : obj.group
                }
            })
            if(baseStrArr.length === 0){
                setEmpty(true);
            }else{
                setEmpty(false);
            }
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
                {!empty &&    
                    
                    img.map((obj) => {
                        return (
                            <div className="img-card">
                                <img className="certificate" src={`data:image/png;base64,${obj.img}`} alt=""/>
                                <p>Name : {obj.certificateName}</p>
                                <p>Group : {obj.group}</p>
                                <button onClick={() => remove(obj.certificateName)}>Delete</button>
                            </div>
                        )  
                    })
                }
                {
                    empty && 

                    <div className="no-img-card">
                        <h1>No Certificate Found</h1>
                        
                    </div>

                   
                }
            </div>
            <AddForm/>
            <Footer/>
        </div>
    )
}
// -----------------------------------------------------------------------------------------

export default UserPage;