import React from "react";
import AddGroup from "./containercomponents/addgroup/AddGroup";
import ShowGroup from "./containercomponents/showgroups/ShowGroup"
import MainPage from "../../../mainpage/MainPage";
import { useState } from "react";


const Container = () => {
    const[groups,setGroups] = useState([]);

    // ---------------------Called by AddGroup Component(Parent) to set the data-----------------
    const show = (data) => {
        const obj = {
            id: groups.length==0 ? 1 : groups[groups.length-1].id + 1,
            name: data
        }
        console.log("success");
        setGroups([...groups,obj]);
    }
    // ------------------------------------------------------------------------------------------

    return (
        <div>
            <div>   
                <ul>
                    <li style={{listStyleType:"none"}}>
                        <AddGroup show={show}/>
                        <div>
                            {groups.map((groupobject) => {
                                return <div key={groupobject.id}>
                                    <ShowGroup name={groupobject.name}/>
                                    <MainPage name={groupobject.name}/>
                                </div>
                            })}
                        </div>
                    </li>
                    {/* <li style={{listStyleType:"none"}}>
                        
                    </li> */}
                </ul>
            </div>
        </div>
    )
}

export default Container;