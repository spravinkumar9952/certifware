import axios from 'axios';
import React, { useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import Cookies from 'js-cookie';
import Footer from '../components/Footer';

export default function Profile() {

    const [name, setName] = useState("");
    const [noOfCert, setNoOfCert] = useState(0);
    const [email, setEmail] = useState("");
    const [noOfGroups, setNoOfGroups] = useState(0);
    // const url = "http://localhost:3000/profile";
    const url = `${process.env.REACT_APP_API_HOST}/profile`;
    const token = Cookies.get('token');

    useEffect(() =>{
        axios.get(url, {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then((res) =>{
            setName(res.data.name);
            setNoOfCert(res.data.length);
        }).catch((e) => {
            console.log(e);
        })
    }, []);

    return (
        <>
        <Navbar/>
        <div className='container'>
            
            <div className="profile-card">
                <h1>Name : {name}</h1>
                <h1>No Of Certificates : {noOfCert}</h1>
            </div>
        </div>
        <Footer/>
        </>
    )
}
