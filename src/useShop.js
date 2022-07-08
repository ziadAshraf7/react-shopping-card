import { useState } from "react"



const useShop = () => {
 
  

   const ItemsFilterFunc = (ItemsData , Gender , FromRange , ToRange) =>{

    if(Gender && FromRange && ToRange ){
        return ItemsData.filter(item =>{
            return item.price >= FromRange && item.price <= ToRange && item.type == Gender
        })
    }else if(FromRange && ToRange){
        return ItemsData.filter(item =>{
            return item.price >= FromRange && item.price <= ToRange ? true : false
        })
    }else if(Gender && FromRange){
        return []
    }else if(Gender && ToRange){
        return []
    }else if(Gender){
        return ItemsData.filter(item =>{
            return  item.type == Gender
        })
    }else{
        return  []
    }

   }


   const HandleCartItems = (ItemsData , ItemIndex) =>{


        let AddedItem = ItemsData[ItemIndex]
        let AddedItemID = AddedItem.id
        if(localStorage.getItem(AddedItemID) === "Added"){
              localStorage.removeItem(AddedItemID)
        }else{
            localStorage.setItem(AddedItemID , "Added")
        }
       
        return AddedItem
   }





   return {ItemsFilterFunc , HandleCartItems }


}
export default useShop