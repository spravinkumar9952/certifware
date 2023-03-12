import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";

import { Form } from "react-router-dom";


const AddForm = (props) => {
    const [name, setName] = useState("");
    const [domain, setDomain] = useState("");
    const [image, setImage] = useState(null);
    const [id, setID] = useState(null);
    const [url, setURL] = useState(null);
    const [state, setState] = useState(false);
    const [msg, setMsg] = useState("");

    const fileUrl = 'http://localhost:8080/upload';




   
    function bind(event) {
        event.preventDefault();
        const data = new FormData();

        data.append('certificate_name', name);
        data.append('certificate', image);
        data.append('certificate_domain', domain);
        data.append('certificate_cred_id', id);
        data.append('certificate_cred_url', url);

        axios.post(fileUrl, data)
            .then((res) => {
                swal(res.data);
            }).catch((err) => {
                console.log(err);
            })
    }
    // ---------------------------------------------------------------------------
    return (
        <>
            {
                state || 
                <div className="container">
                    <button onClick={() => setState(!state)} className="btn">Add Certificate</button>
                </div>
            }
            
            {state && (
                <div className="add-cert">
                        <form onSubmit={bind}>
                            <h1>Add Certificate</h1>
                            <h2>{msg}</h2>
                            <input type="text" name='certificate_name' placeholder="Certificate Name" onChange={(event) => setName(event.target.value)} />

                            <input type="text" name='certificate_domain' placeholder="domain" onChange={(event) => setDomain(event.target.value)} />

                            <input type="file" name="certificate" placeholder="Upload Certificate" onChange={(event) => setImage(event.target.files[0])} />


                            <input type="text" name='certificate_cred_id' placeholder="Credetial Id" onChange={(event) => setID(event.target.value)} />

                            <input type="text" name='certificate_cred_url' placeholder="Credential URL" onChange={(event) => setURL(event.target.value)} />

                            <input className="button" type="submit" value="Add" />

                            <button className="danger-btn" onClick={() => setState(!state)}>Cancel</button>
                        </form>

                </div>
            )}
        </>
    )
}

export default AddForm;