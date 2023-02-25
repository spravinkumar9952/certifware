import React, { useState } from "react"; 

const Navbar = () => {
    const[value,setValue] = useState("");
    const handleSearch = (event) => {
        setValue(event.target.value);
    }
    return (
        <div>
            <h1>Welcome</h1>
            <input type="text" placeholder="Search" onChange={handleSearch}/>
        </div>
    )
}

export default Navbar;