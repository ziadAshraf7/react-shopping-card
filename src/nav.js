import {Link , NavLink} from "react-router-dom"
import React, {useEffect, useRef } from "react";
import { useState  } from "react";

import basket from "./img/5a1d294215f351.6592606815118605460899.png"
import { Offcanvas } from "react-bootstrap";
const NavBar  = (props) => {

  const [show, setShow] = useState(false);
  let [BasketIconAccses , setBasketIconAccses] = useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let cartItemsNumber = props.cartItemsNumber
  

    useEffect(() =>{

      if(window.innerWidth < 776){
        setBasketIconAccses(true)
      }else{
        setBasketIconAccses(false)
      }


      window.addEventListener("resize" , () =>{
        if(window.innerWidth < 776 ){
          setBasketIconAccses(true)
        }else{
          setBasketIconAccses(false)
        }
      })
    })

  

 
  return(
    <>
     
    <div className = "nav">
     <div className = "container">
     <div className = "row rr">
      <div className = "icon col col-6 col-5 d-flex align-items-center"><h4><span>I</span> Watch</h4></div>
    {!BasketIconAccses &&  <ul className ="col-4 col-5 nav-lists d-flex ">
      <div > <li><NavLink  to = "/home"> Home </NavLink></li> </div>
      <div> <li><NavLink to = "/contact">Contact</NavLink></li> </div>
      <div > <li><NavLink to = "/offer" style = {{whiteSpace : "nowrap"}}>offer items</NavLink></li> </div>
      <div > <li ><NavLink to = "/price">price</NavLink></li> </div>
      </ul>}
     <div  className = "Card col  ">
      <Link onClick={() => window.scrollTo(0,0)} to ="/cart"><img className = "basket" src={basket}></img></Link>
      {cartItemsNumber > 0 &&  <div className="counter">{cartItemsNumber}</div>}
      </div>
     <div className = "col d-flex justify-content-end align-items-center">
      {BasketIconAccses && <div variant="primary" onClick={handleShow} className="sidebar-btn">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>}

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <ul className ="sidbar-items " onClick={() => setShow(false)}>
        <li><Link to = "/home">Home</Link></li>
        <li><Link to = "/contact">Contact</Link></li>
        <li><Link to = "/offer" style = {{whiteSpace : "nowrap"}}>offer items</Link></li>
        <li><Link to = "/price">price</Link></li>
      </ul>
        </Offcanvas.Body>
      </Offcanvas></div>
     </div>
     </div>
     </div>
    </>
  )

  
}
export default NavBar ;

