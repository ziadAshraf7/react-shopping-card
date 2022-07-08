import React from "react";
import { useEffect, useState } from "react"
import { useRef } from "react/cjs/react.development";
import useShop from "./useShop";



const Price = (props) => {
  const AddedItemIconURL =  require("./img/—Pngtree—shopping cart icon_5060870.png").default
  const AddItemIconURL = require("./img/add-to-cart.png").default 
  let ItemsData = props.ItemsData
  let ItemsDataFilterd = props.ItemsDataFilterd
  let ItemsDataAccess = props.ItemsDataAccess
  let FilterItemsDataFunc = props.FilterItemsDataFunc
  let AddedToCartItemsFunc = props.AddedToCartItemsFunc

  let {ItemsFilterFunc } = useShop()

  let FromInput = useRef()
  let ToInput = useRef()
  let GenderInput = useRef()

  let [FilterError , setFilterError]  = useState(false)

  useEffect(() =>{
    if(ItemsDataFilterd.length == 0){
      if(ItemsDataAccess)
      setFilterError(true)
    }else{
      setFilterError(false)
    }
  },[ItemsDataFilterd])





return(

  <div className = "components-wrapper" >

{!ItemsDataAccess && <h3 style={{textAlign : "center"}}>Loading...</h3>}

 {ItemsDataAccess &&  <div className = "price-component">
             <h4>Search for your items</h4>
             <div className = "inp-wrapper" >
             <div className = "inp1">
               <label>Gender</label>
               <input type="search" list="search"  onChange={(e) => GenderInput.current = e.target.value}  defaultValue=""/>
                 <datalist id = "search"  >
                   <option >male</option>
                   <option>female</option>
                 </datalist>
             </div>
             <div className = "inp2">
               <label>From</label>
               <input type="number"  onChange= {(e) => FromInput.current = e.target.value } ></input>
               <label>To</label>
               <input type="number"  onChange= {(e) => ToInput.current = e.target.value } ></input>
             </div>
            
          </div>
  <div style = {{display : "flex" , flexDirection : "column" , alignItems : "center"}}>
  <button className = " button" style={{marginBottom : "20px" , placeItems:"center" }}  onClick={() =>{
    let FilteredItems = ItemsFilterFunc(ItemsData , GenderInput.current , FromInput.current , ToInput.current )
   
    if(!GenderInput.current && !ToInput.current && !FromInput.current){
      return
    }

    if(FilteredItems.length > 0){
      FilterItemsDataFunc(FilteredItems)
    }else{
      FilterItemsDataFunc([])
      setFilterError(true)
    }
   
}}>Search</button>
   <button className = " button" style={{marginBottom : "10px" }} onClick={() =>{
     FilterItemsDataFunc(ItemsData)
     setFilterError(false)
   }}>reset to all items</button>
  </div>
          </div>}

          {FilterError && <h3 style={{textAlign : "center"}}>The Items you have filtered is not Found</h3>}


          <div className = "items-wrapper">
      {ItemsDataAccess && ItemsDataFilterd.map((item,ItemIndex) =>{
              if(ItemsDataFilterd.length > 0){
               return <div className = "item-package" key = {item.id}>
               <div className = "img">
                 <img className = "watch"  src={require(`${item.picUrl}`).default}></img>
               </div>
               <div className = "content">
               <h3>{item.name}</h3>
               <h4>{item.price}</h4>
               </div>
               <div className="AddIcon" data-id={item.id}>
               <img  src={localStorage.getItem(item.id) === "Added" ? AddedItemIconURL : AddItemIconURL } onClick = {() =>{
                
              AddedToCartItemsFunc(item)
            
               }}  />
               </div>
             </div>}
               }) }
             </div>
           
  </div>
  
)
    
 
}
 
export default Price;