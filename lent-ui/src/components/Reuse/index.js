import React, { useState } from 'react'
import {useLocation,Link} from "react-router-dom"
import "./index.css";

function Reuse() {
    const pathName=useLocation().pathname
    const [showText,setShowText]=useState(false)
    const onMouse=()=>{
      setShowText(true)
    }
    const onLeave=()=>{
      setShowText(false)
    }
  return (
    <>
    {pathName==='/admin' ? 
    <div className='admin-main' >
        {showText?
     <strong className='text strong-text' >
         Go to Home
      </strong>:
      ''} 
        <Link to="/" >
          <i className="bi bi-house text user-icon" onMouseEnter={onMouse} onMouseLeave={onLeave} ></i>
      </Link>
    </div>
    :
    <div className="admin-main" >
     {showText?
     <strong className='text strong-text'>
        Admin-panel
      </strong>:
      ''} 
      <Link to="/admin" >
          <i className="bi bi-person-fill text user-icon" onMouseEnter={onMouse} onMouseLeave={onLeave} ></i>
      </Link>
    </div>
    }
   
    </>
  )
}

export default Reuse
