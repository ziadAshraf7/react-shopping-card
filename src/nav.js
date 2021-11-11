import {Link , NavLink} from "react-router-dom"
import { useHistory } from "react-router";
import React, {useEffect, useRef } from "react";
import { useState  } from "react";

import basket from "./img/5a1d294215f351.6592606815118605460899.png"
import {CardCounterContext} from "./Home"
import { useContext } from "react";
import {priceLinkContext} from "./Home"
import { Offcanvas } from "react-bootstrap";
const NavBar  = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

  let history = useHistory()

  
  let cardCounter = useContext(CardCounterContext)
  let CounterRefNav = useRef(null)  
  let resettoallfunc = useContext(priceLinkContext)

  useEffect(() =>{
    if(cardCounter == 0){
      CounterRefNav.current.style.visibility = 'hidden'
    }else{
      CounterRefNav.current.style.visibility = 'visible'
    }
  },[cardCounter])


  // for Responsive Design
  window.addEventListener("resize" , () =>{
    if(document.documentElement.clientWidth < 996 ){
      setaccses(false)
      setres(true)
    }else{
      setaccses(true)
      setres(false)
    }
  })

 useEffect(() => {
  if(document.documentElement.clientWidth < 996 ){
    setaccses(false)
    setres(true)
  }else{
    setaccses(true)
    setres(false)
  }
 })
  
  

  let [navitemsaccses , setaccses] = useState(true)
  let [responsiveBtnNavLinks , setres] = useState(false)

  return(
    <>
     
    <div className = "nav">
     <div className = "container">
     <div className = "row rr">
      <div className = "icon col col-6  d-flex align-items-center"><h4><span>I</span> Watch</h4></div>
    {navitemsaccses &&   <ul className ="col-4 nav-lists d-flex align-items-center">
      <div onClick={() => history.push("/")} > <li><NavLink exact to = "./"> Home </NavLink></li> </div>
      <div onClick={() => history.push("/contact")}> <li><NavLink to = "./contact">Contact</NavLink></li> </div>
      <div onClick={() => history.push("/offer")}> <li><NavLink to = "./offer" style = {{whiteSpace : "nowrap"}}>offer items</NavLink></li> </div>
      <div onClick={() => history.push("/price")}> <li onClick = {resettoallfunc}><NavLink to = "./price">price</NavLink></li> </div>
      </ul>
} 
      <div to="#" className = "Card col col-2 ">
      <Link to="/card"><img className = "basket" src = {basket}></img></Link>
      <div className="counter" ref={CounterRefNav} style = {{visibility : "hidden"}}>{cardCounter}</div>
      </div>
      {responsiveBtnNavLinks && <div className = "col d-flex justify-content-end align-items-center">
        <div variant="primary" onClick={handleShow} className="sidebar-btn">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <ul className ="sidbar-items ">
        <li><NavLink to = "./">Home</NavLink></li>
        <li><NavLink to = "./contact">Contact</NavLink></li>
        <li><NavLink to = "./BestSeller" style = {{whiteSpace : "nowrap"}}>offer items</NavLink></li>
        <li onClick = {resettoallfunc}><NavLink to = "./price">price</NavLink></li>
      </ul>
        </Offcanvas.Body>
      </Offcanvas></div>}
     </div>
     </div>
     </div>
    </>
  )

  
}
export default NavBar ;

