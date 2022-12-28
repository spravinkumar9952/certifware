import React from "react";
import { useState } from "react";
import AddForm from "./AddForm";
import "./Popup.css";
import View from "./View";

const MainPage = () => {
    const[data,setData] = useState([]);

    const display = (fileDetails) => {
        console.log("MainPage");
        const certificate_image = fileDetails.image;
        const certificate_name =  fileDetails.name;
        const obj = {
            id: data.length==0?1:data[data.length-1].id+1,
            img: certificate_image,
            name: certificate_name
        }
        setData([...data,obj])  
    }

    return (
        <>
            <AddForm display={display}/>
            <div>
                {data.map((details) => {
                    return <li style={{display:"inline-block",margin:"10px"}}>
                        <View key={details.id} name={details.name} img={details.img}/>
                    </li>
                })}
            </div>
        </>
    )
}

export default MainPage;