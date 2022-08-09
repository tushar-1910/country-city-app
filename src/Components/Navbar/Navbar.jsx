import React from 'react'
import { Link } from 'react-router-dom'
function Navbar() {
    return (
        <div style={{"justifyContent":"space-evenly",display:"flex",background:"#eee",padding:"0.5rem"}}>
            <Link to="/" style={{textDecoration:'none',color:"blueviolet",fontSize:"20px"}}>Home</Link>
            <Link to="/add-city" style={{textDecoration:'none',color:"blueviolet",fontSize:"20px"}}>Add City</Link>
            <Link to="/add-country" style={{textDecoration:'none',color:"blueviolet",fontSize:"20px"}}>Add Country</Link>
        </div>
    )
}

export default Navbar