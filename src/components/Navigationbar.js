import React from 'react'
import { NavLink } from 'react-router-dom';

function Navigationbar() {

  const activeLink={
    color:"red",
    fontWeight:'bold',
    fontSize:"120%"  
  };
  const inactiveLink={
    color:'grey'
  };

  return (
    <div className='bg-light mt-1 fw-bold'>
      <nav className="navbar navbar-expand-lg navbar-light pb-0">
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav mt-2 fs-5">
      <li className="nav-item">
        <NavLink className="nav-link" style={({isActive})=>{return isActive?activeLink:inactiveLink}} to="/">AddTask</NavLink>
      </li>
      <li className="nav-item ">
        <NavLink className="nav-link" style={({isActive})=>{return isActive?activeLink:inactiveLink}} to="/tasklist">TaskList</NavLink>
      </li>
    </ul>
  </div>
</nav>  
<hr/>
    </div>
  )
}

export default Navigationbar