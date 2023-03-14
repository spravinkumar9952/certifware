import axios from 'axios';
import React, { useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import Cookies from 'js-cookie';

export default function Profile() {

    const [name, setName] = useState("");
    const [noOfCert, setNoOfCert] = useState(0);
    const [email, setEmail] = useState("");
    const [noOfGroups, setNoOfGroups] = useState(0);
    const url = "http://localhost:3000/profile";
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
        <div>
            <Navbar />
            <div className="profile">
                <h1>Name : {name}</h1>
                <h1>No Of Certificates : {noOfCert}</h1>
            </div>
        </div>
    )
}
