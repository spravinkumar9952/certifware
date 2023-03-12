import React, { useState } from "react";
import MainPage from "../pages/MainPage";

import axios from "axios";

const AddGroup = (props) => {

    const url="http://localhost:8080//showgroup";

    const[state,setState] = useState(false);
    const[groupname,setGroupName] = useState("");

    // --------------------Child to Parent Props Passing--------------------------
    const createGroup = (event) => {
        handleChange();
        event.preventDefault();
        const group_name=groupname;
        // axios.post(url,group_name);
        // axios.get(url).then((response) => {
        //     setGroupName(response);
        // }).catch(err) {
        //    console.log("Error in adding group")
        // }
        props.show(groupname);
    }
    // ---------------------------------------------------------------------------

    // -------------------------Change the state to popup-------------------------
    const handleChange = () => {
        setState(!state);
    }
    // ---------------------------------------------------------------------------

    // ---------------------------------------------------------------------------
    return (
        <>
            <div>
                <button className="button" onClick={handleChange}>Add Group</button>
            </div>
            {state && (
                    
                    <div className="popup-content">
                        <form onSubmit={createGroup}>
                          
                                <input type="text" placeholder="Group Name" onChange={(event) => setGroupName(event.target.value)}/>
                            
                                <input className="button" type="submit" value="Add"/>
                                
                                <button className="danger-btn" onClick={handleChange}>Cancel</button>
            
                        </form>
                    </div>
            )}
        </>
    )
    // ---------------------------------------------------------------------------
}

export default AddGroup;