import React from "react";
import AddGroup from "./AddGroup";
import ShowGroup from "./ShowGroup"
import MainPage from "../pages/MainPage";
import { useState } from "react";


const Container = () => {
    const [groups, setGroups] = useState([]);

    // ---------------------Called by AddGroup Component(Parent) to set the data-----------------
    const show = (data) => {
        const obj = {
            id: groups.length == 0 ? 1 : groups[groups.length - 1].id + 1,
            name: data
        }
        console.log("success");
        setGroups([...groups, obj]);
    }
    // ------------------------------------------------------------------------------------------

    return (
        <div className="container">
            <AddGroup show={show} />
            <div className="ctf-container">
                
                <div>
                    {groups.map((groupobject) => {
                        return <div key={groupobject.id}>
                            <ShowGroup name={groupobject.name} />
                            <MainPage name={groupobject.name} />
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Container;