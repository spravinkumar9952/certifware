import React from "react";

const View = (props) => {
    return (
        <div>
            <div>
                <img src={URL.createObjectURL(props.img)} height={190} width={350}/>
                <h4>{props.name}</h4>
            </div>
        </div>
    )
}

export default View;