import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import NavBar from "./nav";

const Cart = (props) => {
    let [EmptyCart, setEmptyCart] = useState(false)
    let AddedToCartItemsFunc = props.AddedToCartItemsFunc

    const CartItems = [...JSON.parse(localStorage.getItem("cartItems"))]


    useEffect(() =>{
      if(CartItems.length == 0){
        setEmptyCart(true)
      }
    })

return(
    <section className = "sec1">
      <div className = "components-wrapper cart-comp">
    <div className = "added-items">
      {EmptyCart && <h4 className="d-flex justify-content-center">No items were added to cart</h4>}
      {!EmptyCart && CartItems.map(item => {
    return  <div className="wrapper" key ={item.id}>
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
      <button className="cart-btn button" onClick = {() => {
        AddedToCartItemsFunc(item)
      }}>Remove</button>
      </div>}
    )}
    </div>
    </div>


    </section>
)

}
 
export default Cart;