import React from "react";

const View = (props) => {
    return (
        <div>
            <div>
            <img src={URL.createObjectURL(props.img)} height={190} width={350}/>
                <ul>
                    <li style={{display:"inline-block"}}><h4>{props.name}</h4></li>
                    <li style={{display:"inline-block"}}><button onClick={() => props.remove(props.id)}>Remove</button></li>
                    <li style={{display:"inline-block"}}><button onClick={() => props.edit(props.id)}>Edit</button></li>
                </ul>
            </div> 
        </div>
    )
}

export default View;