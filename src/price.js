import React from "react";
import { useEffect, useState } from "react"
import NavBar from "./nav";
import addtocardicon from "./img/add-to-cart.png"
import { useRef } from "react/cjs/react.development";
import Footer from "./footer";



const Price = React.forwardRef((props,ref) => {
  let [arr , setarr] = useState([])
  let [error , seterror] = useState(false)
  let [accses , setaccses] = useState(false)
  let {addedTocart , CartNumberIncreament} = props.props2
  let AddedTocartArray = props.props3
  let {array,accses1} = props.data

  let {shuffle , fromTo} = props.props4
  
  let {priceFromInputRef ,priceToInputRef ,shuffleRef}  = ref
  let resetToallItems = props.props5


 let fromInput = useRef(null)
 let ToInput = useRef(null)

 useEffect(() =>{
   if(accses1){
  if(array.length == 0){
    seterror(true)
  }else{
    seterror(false)
  }
}
 },[array.length])

return(

  <div >
    <NavBar />
    <div className = "components-wrapper price-component">
           <div className ="section1">
             <h4>Search for your items</h4>
             <div className = "inp-wrapper">
             <div className = "inp1">
               <label>Gender</label>
               <input type="search" list="search" ref={shuffleRef} defaultValue=""/>
                 <datalist id = "search" >
                   <option >male</option>
                   <option>female</option>
                 </datalist>
               <button className = "search-btn button" onClick = {() =>{
                if(shuffleRef.current.value == "male" || shuffleRef.current.value == "female" ) {
                  shuffle(shuffleRef.current.value)
                }else{
                  return false
                }
               }}>search</button>
    
             </div>
             <div className = "inp2">
               <label>From</label>
               <input type="number" ref={priceFromInputRef}></input>
               <label>To</label>
               <input type="number" ref= {priceToInputRef}></input>
               <button className = "search-btn button" onClick = {() =>{
                 fromTo(priceFromInputRef.current.value ,priceToInputRef.current.value)
               }}>Search</button>
             </div>
             </div>  
             <button className = " button" onClick = {resetToallItems}>reset to all items</button>
 
          </div>
          </div>
          {error && <h1>Items not found</h1>}
          {!accses1 && <h5>Loading...</h5>}
          <div className = "items-wrapper">
               {accses1 && array.map((item) =>{
               return <div className = "item-package" key={item.id} id ={item.id} type={item.type ? item.type : null}>
               <div className = "img">
                 <img className = "watch" src={require(`${item.picUrl}`).default}></img>
               </div>
               <div className = "content">
               <h3>{item.name}</h3>
               <h4>{item.price}</h4>
               </div>
               <div className="AddIcon" data-id={item.id}>
               <img src={addtocardicon} onClick = {(e) =>{
                  addedTocart(e)
                  CartNumberIncreament()
               }}  />
               </div>
             </div>
               }) }
             </div>
             <Footer />
  </div>
  
)
    
 
})
 
export default Price;