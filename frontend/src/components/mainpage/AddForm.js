import React, { useState } from "react";
import axios from "axios";
import "./Popup.css";

const AddForm = (props) => {
    const[name,setName] = useState("");
    const[domain,setDomain] = useState("");
    const[image,setImage] = useState(null);
    const[id,setID] = useState(null);
    const[url,setURL] = useState(null);

    const fileUrl="http://localhost:8080/filedetails";

    const[state,setState] = useState(false)
    const[dataFromServer,setDataFromServer] = useState(null)
    
    // -------------------------Change the state for popup window-----------------
    const handleFile = (event) => {
        setState(!state)
    }
    // ---------------------------------------------------------------------------


    // --------------------Child to Parent Props Passing--------------------------
    const bind = (event) => {
        handleFile();
        event.preventDefault();
        const fileDetails = {name,domain,image,id,url};
        console.log(fileDetails)
        // axios.post(fileUrl,fileDetails);
        // axios.get(fileUrl).then((response) => {
        //     setDataFromServer(response);
        // }).catch(err) {
        //    console.log("Error in adding form");
        // }
        props.display(fileDetails);
    }
    // ---------------------------------------------------------------------------



    return (
        <>
            <div>
                <button onClick={handleFile} className="btn">Add Certificate</button>
            </div>
            {state && (
                    <div className="popup">
                    <div onClick={handleFile} className="overlap"></div>
                    <div className="popup-content">
                        <form onSubmit={bind}>
                            <div className="field">
                                <label>Certificate Name</label>
                                <br></br>
                                <input type="text" onChange={(event) => setName(event.target.value)}/>
                            </div>
                            <div className="field">
                                <label>Domain</label>
                                <br></br>
                                <input type="text" onChange={(event) => setDomain(event.target.value)}/>
                            </div>
                            <div className="field">
                                <label>Upload Certificate</label>
                                <br></br>
                                <input type="file" onChange={(event) => setImage(event.target.files[0])}/>
                            </div>
                            <div className="field">
                                <label>Credential ID</label>
                                <br></br>
                                <input type="text" onChange={(event) => setID(event.target.value)}/>
                            </div>
                            <div className="field">
                                <label>Credential ID</label>
                                <br></br>
                                <input type="text" onChange={(event) => setURL(event.target.value)}/>
                            </div>
                            <div className="add">
                                <input className="close-popup" type="submit" value="Add"/>
                                <br></br>
                                <button onClick={handleFile}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default AddForm;