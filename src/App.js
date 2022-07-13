import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router   , Routes , Route } from "react-router-dom"
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useEffect, useState } from 'react';
import NavBar from './nav';
import Contact from './contact';
import Price from './price';
import BestSeller from './bestSeller';
import Footer from './footer';
import Offer from './offer';
import Cart from './cart';
import UserHome from './Home';
import useDataFetching from './useDataFetching';


const App  = () => {
    let RandomFilteredItems = [11, 6, 7, 8, 5, 1, 14, 10, 9, 2, 4, 3, 12, 0, 13]
    let {data,accses:ItemsDataAccess } = useDataFetching("https://fakeapi1.herokuapp.com/items")
    let  {data : OfferItems ,accses : OfferItemsAccses} = useDataFetching("https://fakeapi1.herokuapp.com/offer")
    let [RandomFilteredItemsData , setRandomFilteredItemsData ] = useState([])
    let [ItemsData , setItemsData ] = useState([])
    let [ItemsDataFilterd , setItemsDataFilterd ] = useState([])
    let [cartItemsNumber , setcartItemsNumber] = useState(0)

    
  
    const FilterItemsDataFunc = (FilterItems) =>{
        setItemsDataFilterd(FilterItems)
    }

  
    const AddedToCartItemsFunc = (Item) =>{
        if(localStorage.getItem(Item.id) == "Added"){
            localStorage.removeItem(Item.id)
            setcartItemsNumber(prev => prev - 1)

            let cartItems = [...JSON.parse(localStorage.getItem("cartItems"))]
            let RemovedItemIndex = cartItems.findIndex(item => item.id == Item.id)
            cartItems.splice(RemovedItemIndex , 1)
            localStorage.setItem("cartItems" , JSON.stringify([...cartItems]))
        }else{
            localStorage.setItem(Item.id , "Added")
            setcartItemsNumber(prev => prev + 1)
            let cartItems = JSON.parse(localStorage.getItem("cartItems"))
            localStorage.setItem("cartItems" , JSON.stringify([...cartItems , Item]))
        }
    }

useEffect(() =>{
   if(ItemsDataAccess){
    RandomFilteredItems.forEach(item =>{
        let randomIndex = item
        RandomFilteredItemsData.push(data[randomIndex])

        setRandomFilteredItemsData([...RandomFilteredItemsData])
        setItemsData(data)
        setItemsDataFilterd(data)
    })
   } 
},[ItemsDataAccess])



   useEffect(() =>{
    setcartItemsNumber([...JSON.parse(localStorage.getItem("cartItems"))].length)
   },[])
 return (
   <div >

  <Router>

  <NavBar cartItemsNumber = {cartItemsNumber} />     

  <Routes>

 <Route  path = "/" element = { <UserHome OfferItems = {OfferItems}   AddedToCartItemsFunc = {AddedToCartItemsFunc}    RandomFilteredItemsData={RandomFilteredItemsData} ItemsDataAccess={ItemsDataAccess} ItemsData = {ItemsData}/>} />


 <Route path = "price" element = { <Price  AddedToCartItemsFunc = {AddedToCartItemsFunc}    RandomFilteredItemsData={RandomFilteredItemsData} ItemsData = {ItemsData} ItemsDataFilterd={ItemsDataFilterd} ItemsDataAccess={ItemsDataAccess} FilterItemsDataFunc = {FilterItemsDataFunc}  />} />
 

 <Route path="BestSeller" element = {<BestSeller  />} />


 <Route  path ="cart" element = {  <Cart AddedToCartItemsFunc = {AddedToCartItemsFunc} />} />


 <Route path ="contact" element = { <Contact  />} />
    
 <Route path="offer" element = {    <Offer props = {{AddedToCartItemsFunc , OfferItems , OfferItemsAccses}} />} />


  </Routes>
 </Router>

 <Footer />
 </div>
 )

 
}







export default App;
