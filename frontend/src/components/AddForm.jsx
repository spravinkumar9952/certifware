import React, { useState } from "react";
import axios from "axios";

import { Form } from "react-router-dom";


const AddForm = (props) => {
    const [name, setName] = useState("");
    const [domain, setDomain] = useState("");
    const [image, setImage] = useState(null);
    const [id, setID] = useState(null);
    const [url, setURL] = useState(null);

    const fileUrl = 'http://localhost:8080/upload';


    const [state, setState] = useState(false)
    const [dataFromServer, setDataFromServer] = useState(null)

    // -------------------------Change the state for popup window-----------------
    const handleFile = (event) => {
        setState(!state)
    }
    // ---------------------------------------------------------------------------


    // --------------------Child to Parent Props Passing--------------------------
    function bind(event) {
        handleFile();
        event.preventDefault();
        const data = new FormData();
        data.append('certificate_name', name);
        data.append('certificate', image);
        data.append('certificate_domain', domain);
        data.append('certificate.cred_id', id);
        data.append('certificate_cred_url', url);
        props.display(data);
    }
    // ---------------------------------------------------------------------------
    return (
        <>
            <div className="container">
                <button onClick={handleFile} className="btn">Add Certificate</button>
            </div>
            {state && (
                <div className="popup">
                    <div onClick={handleFile} className="overlap"></div>
                    <div className="popup-content">
                        <form onSubmit={bind}>
                            <input type="text" name='certificate_name' placeholder="Certificate Name" onChange={(event) => setName(event.target.value)} />

                            <input type="text" name='certificate_domain' placeholder="domain" onChange={(event) => setDomain(event.target.value)} />

                            <input type="file" name="certificate" placeholder="Upload Certificate" onChange={(event) => setImage(event.target.files[0])} />


                            <input type="text" name='certificate_cred_id' placeholder="Credetial Id" onChange={(event) => setID(event.target.value)} />

                            <input type="text" name='certificate_cred_url' placeholder="Credential URL" onChange={(event) => setURL(event.target.value)} />

                            <input className="button" type="submit" value="Add" />

                            <button className="danger-btn" onClick={handleFile}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default AddForm;