import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import NavBar from "./nav";

const Cardd = (props) => {
    let AddedTocartArray = props.props
    let [accses , setaccses] = useState(false)
    let ref = props.props
    let [counter , setcounter] = useState(0)
    let CartNumberdecrement = props.props2
    let removeFromCart = props.props3
  useEffect(() =>{
    if(AddedTocartArray.length > 0){
      setaccses(true)
    }else{
      setaccses(false)
    }
  },[counter])

  let increment = () =>{
    setcounter((prev) => prev + 1)
  }


 
return(
    <section className = "sec1">
      <NavBar />
      <div className = "components-wrapper cart-comp">
    <div className = "added-items">
      {!accses && <h4 className="d-flex justify-content-center">No items were added to cart</h4>}
      {accses && AddedTocartArray.map((item) => 
      <div className="wrapper" key ={item.id} id={item.id}>
      <div className = "package-content">
        <div className = "icon">
          <img src={require(`${item.picUrl}`).default}/>
        </div>
        <div className = "info">
          <h3>{item.name}</h3>
          <h5>{item.price}$</h5>
          <p>Lorem ipsum dollerr sign set amit kadfn dkf djfbh djghjdfh jgbj</p>
        </div>
      </div>
      <button className="cart-btn button" onClick = {(e) => {
      increment()
      CartNumberdecrement()
      removeFromCart(e)
      }}>Remove</button>
      </div>
    )}
    </div>
    </div>


    </section>
)

}
 
export default Cardd;