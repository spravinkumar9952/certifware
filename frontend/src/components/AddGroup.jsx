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
                <button onClick={handleChange}>Add Group</button>
            </div>
            {state && (
                    <div className="popup">
                    <div onClick={handleChange} className="overlap"></div>
                    <div className="popup-content">
                        <form onSubmit={createGroup}>
                            <div className="field">
                                <label>Group Name</label>
                                <br></br>
                                <input type="text" onChange={(event) => setGroupName(event.target.value)}/>
                            </div>
                            <div className="add">
                                <input className="close-popup" type="submit" value="Add"/>
                                <br></br>
                                <button onClick={handleChange}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
    // ---------------------------------------------------------------------------
}

export default AddGroup;