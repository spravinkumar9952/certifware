import React from 'react'
import { useState } from 'react'
import axios from 'axios';

function EditForm(props) {


    const[Name,setName] = useState(props.data.certificateName);
    const[Domain,setDomain] = useState(props.data.group);
    const[Id,setID] = useState(props.data.creadentialId);
    const[URL,setURL] = useState(props.data.creadentialUrl);

    const initialName = props.data.certificateName;
    

    const updateUrl = 'http://localhost:8080/update';
    const update = () => {
        const userName = props.data.userName;
        
        const updatedData = {userName, initialName, Name, Domain, Id, URL};
        console.log(updatedData)
        axios.put(updateUrl,updatedData)
        .then((res) => {
            console.log("kdsfjsdfj");
            console.log(res);
            // if(res=='success') {
            //     // setState(false);
            //     // props.newState(false);
            //     // console.log("ffdf "+props.editState);
            //     //console.log("Res for update");

                
            // }
        }).catch((err) => {
            console.log("Err for update");
            console.log(err);
        })
    }

  return (
    <div className="add-cert">
            {props.editState && <form> 
                <h1>Edit Certificate</h1>
                <label>Certificate Name</label>
                <input type="text" name='certificate_name' value={Name} onChange={(event) => setName(event.target.value)} />
                <label>Certificate Domain</label>
                <input type="text" name='certificate_domain' value={Domain} onChange={(event) => setDomain(event.target.value)} />
                <label>Certificate ID</label>
                <input type="text" name='certificate_cred_id' value={Id} onChange={(event) => setID(event.target.value)} />
                <label>Certificate URL</label>
                <input type="text" name='certificate_cred_url' value={URL} onChange={(event) => setURL(event.target.value)} />

                <button className='button' onClick={() => update()}>Update</button>
``
                <button className="danger-btn" onClick={() => props.newState(false)}>Cancel</button>
            </form>}
    </div>
    
  )
}

export default EditForm;
