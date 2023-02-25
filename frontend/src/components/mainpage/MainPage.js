import React from "react";
import axios from "axios";
import { useState} from "react";
import AddForm from "./AddForm";
import View from "./View";

const fileUrl='http://localhost:8080/upload';



// import "./Scroll.css"

const MainPage = (props) => {
    const[data,setData] = useState([]);
    const[groupname,setGroupName] = useState(props.name);

    
    // ---------------------Called by AddForm Component(Parent) to set the details---------------

    const upload = (fileDetails) => {
        axios.post(fileUrl,fileDetails)
        .then((res) => {
        }).catch((err) => {
            console.log(err);
        })
    }

    // axios.get(fileUrl).then((response) => {
    // }).catch(err) {
    //    console.log("Error in adding form");
    // }

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
    // -------------------------------------------------------------------------------------------

    // ---------------------------------Remove certificate----------------------------------------
    const remove = (certId) => {
        const temp = data.filter((obj) => {
            if(obj.id === certId) return false;
            else return true;
        })
        setData(temp);
    }
    // -------------------------------------------------------------------------------------------

    return (
        <>
            <div className="scr-bg">
                <div className="scr-div">
                    <div className="scr-obj">
                        <AddForm display={upload}/>
                        <div>
                            {data.map((details) => {
                                return <li style={{display:"inline-block",margin:"10px"}}> 
                                    <View name={details.name} img={details.img} id={details.id} remove={remove}/>
                                </li>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainPage;