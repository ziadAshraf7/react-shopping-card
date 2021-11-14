
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route } from "react-router-dom"
import { useEffect, useRef, useState } from 'react';
import img from "./img/3caf4c96e3dfd87e588452d9b62cfaa0.jpg"
import NavBar from './nav';
import Contact from './contact';
import Price from './price';
import BestSeller from './bestSeller';
import { useHistory } from 'react-router-dom';
import useFetch from "./fetchingdata"
import Footer from './footer';
import Offer from './offer';
import Cart from './cart';


  export const CardCounterContext = React.createContext()
  let CardProvider = CardCounterContext.Provider

  export const priceLinkContext = React.createContext() 
  let PriceLinkContextProvider = priceLinkContext.Provider
  let randomArray = Array.from({length : 20} , (item , index) => index)
const Home = () => {
  let {data:FetchingItems,accses:accses1} = useFetch("https://fake-server-apppppp.herokuapp.com/items");
  let {data:FetchingOfferItems,accses:accses2 } = useFetch("https://fake-server-apppppp.herokuapp.com/offer");
  let [offerItemsArray , setofferarray] = useState([])
  let [maleItems , setmaleitems] = useState([])
  let [femaleItems , setfemaleitems] = useState([])
  let [dataItems , setdataItems] = useState([])
  let [array , setarray] = useState([])
  let [arr , setarr] = useState([])
  let [accses , setaccses] = useState(false)
  let [AddedTocartArray , setTocartArray] = useState([])
  let history = useHistory();
  
  let [CartNumberIncreamentCounter , setCounter] = useState(0)
  let [counter , setcounter2] = useState(0)
  let priceFromInputRef = useRef()
  let priceToInputRef = useRef()
  let shuffleRef = useRef()
  let handleClick = () =>{
    history.push("/price")
  }



  let ref = {
    priceFromInputRef : priceFromInputRef , 
    priceToInputRef : priceToInputRef ,
    shuffleRef : shuffleRef
  }

  useEffect(() =>{
    if(accses1){
      setdataItems(FetchingItems)
      setaccses(true)
    }
  },[accses1])

useEffect(() =>{
  if(accses2){
    setofferarray(FetchingOfferItems)
  }
},[accses2])

useEffect(() =>{
 if(offerItemsArray.length > 0){
  offerItemsArray.forEach((item) =>{
    item.src = "./img/add-to-cart.png"
    item.type = "offer"
    item.checked = false
  })
 }
},[offerItemsArray.length])


  useEffect(() =>{
    maleItems.length = 0
    femaleItems.length = 0
    dataItems.forEach((item) =>{
      if(item.type == "male"){
        maleItems.push(item)
      }else{
        femaleItems.push(item)
      }
    })
    setmaleitems([...maleItems])
    setfemaleitems([...femaleItems])
  },[dataItems.length])

 



useEffect(() =>{
  if(accses1){
  for(let i=0 ; i<= 19 ; i++ ){
    arr.push(FetchingItems[i])
  }
  setarr([...arr])
  setaccses(true)
  }
},[accses1])




useEffect(() =>{
  if(accses1){
    setarray(FetchingItems)
  }
},[accses1])


let resetToallItems = () =>{
  setarray([...dataItems])
  if(shuffleRef.current){
  shuffleRef.current.value = ""
  priceFromInputRef.current.value = ""
  priceToInputRef.current.value = ""
  }
 }

let addedTocart = async (e) =>{
let id = e.target.closest(".item-package").id

  let AddedtocartItem = dataItems.find((item) =>{
     if(item.id == id){
      setTocartArray([...AddedTocartArray , item])
       return true
     }
  })
  let deletedItemIndex = dataItems.findIndex((item) =>{
    return item.id == id
  })
  dataItems.splice(deletedItemIndex , 1)
  setdataItems([...dataItems])
  setarray([...dataItems])

  if(shuffleRef.current){
    
    if(shuffleRef.current.value == "male"){
      setarray([...maleItems])
    }else if(shuffleRef.current.value == "female"){
      setarray([...femaleItems])
    }else{
      setarray([...dataItems])
    }

    if(priceFromInputRef ||priceToInputRef ){
      if(priceFromInputRef.current.value == "" ||priceFromInputRef.current.value == "" ){
        return false
      }else{
      fromTo(priceFromInputRef.current.value ,priceToInputRef.current.value)
      }
    }


  }

}

let addedtocartofferitem = (e) =>{
  let id = e.target.closest(".item-package").id

  let AddedtocartItem = offerItemsArray.find((item) =>{
    return item.id == id
 })
 setTocartArray([...AddedTocartArray , AddedtocartItem])
}


  let removeFromCart = (e) =>{
   
  let id = e.target.closest(".wrapper").id
  let item = AddedTocartArray.find((item) =>{
    return item.id == id
  })

  if(item.offer){
    offerItemsArray.forEach((item) =>{
      if(item.id == id){
          item.src = "./img/add-to-cart.png"
          item.checked = false
      }
  })
  setofferarray([...offerItemsArray])

  AddedTocartArray.forEach((item , index) =>{
    if(item.id == id && item.type == "offer"){
      AddedTocartArray.splice(index , 1)
    }
  })
  }else{
  let removedItem =  AddedTocartArray.find((item , index) =>{
      if(item.id == id){
        AddedTocartArray.splice(index , 1)
        return true
      }
      setTocartArray([...AddedTocartArray])
    })

    dataItems.unshift(removedItem)
    setdataItems([...dataItems])
    setarray([...dataItems])
    setcounter2((prev) => prev + 1)
  }
  }



  let CartNumberIncreamentRef = useRef(null)

  let CartNumberIncreament = () =>{
    setCounter((prev) => prev + 1)
  }

  let CartNumberdecrement = () =>{
    setCounter((prev) => prev - 1)
  }

  // price component functions

  let shuffle = (gender) =>{
 
    if(gender == "male"){
     
      setarray([...maleItems])
    }else{
      setarray([...femaleItems])
    }
      }
     
   
  let fromTo = (fromInput, toinput) =>{
    let arr = []
    if(shuffleRef.current.value == ""){
      dataItems.forEach((item) =>{
        if(item.price >= fromInput && item.price <= toinput ){
          arr.push(item)
        }
      })
      setarray([...arr])
    }else if(shuffleRef.current.value == "male"){
      maleItems.forEach((item) =>{
        if(item.price >= fromInput &&item.price <= toinput ){
          arr.push(item)
        }
      })
      setarray([...arr])
    }else if(shuffleRef.current.value == "female"){
      femaleItems.forEach((item) =>{
        if(item.price >= fromInput &&item.price <= toinput ){
          arr.push(item)
        }
      })
      setarray([...arr])
    }else{
      return false
    }
  }

  // offer component 

   let checkedIcon = (e) =>{
        let id = e.target.closest(".item-package").id
        offerItemsArray.forEach((item) =>{
          if(item.id == id){
              item.src = "./img/check-mark.png"
              item.checked = true
          }
      })
      setofferarray([...offerItemsArray])
    }


    let uncheckeicon = (e) =>{
      let id = e.target.closest(".item-package").id
      offerItemsArray.forEach((item) =>{
        if(item.id == id){
            item.src = "./img/add-to-cart.png"
            item.checked = false
        }
    })
    setofferarray([...offerItemsArray])

    AddedTocartArray.forEach((item , index) =>{
      if(item.id == id && item.type == "offer"){
        AddedTocartArray.splice(index , 1)
      }
    })

    }

  return(
    <>
   <Route exact path = "/">
 <div className = "section-wrapper"> 
   <section className = "sec1">
     <CardProvider value = {CartNumberIncreamentCounter}>
       <PriceLinkContextProvider value={resetToallItems}>
      <NavBar />
      </PriceLinkContextProvider >
      </CardProvider>
     <div className = "cover">
       <img src = {img} />
     </div>
     <div className = "content-wrapper row">
     <div className="content  col-12  d-flex  justify-content-lg-end  justify-content-center ">
      <div>
       <h1><span className = "I-header">I</span> watch</h1>
       <h3>for the most recent watches</h3>
       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
       <button className = "button">Discover Now</button>
     </div>
     </div>
     </div>
   </section>
{/* sec 1 End*/}

{/* sec2 start */}
<section className="sec2">
  <div className="wave"></div>
 <div className = "wrapper row">
  <div className = "header col-lg col-sm-12 d-sm-flex justify-content-sm-center d-flex justify-content-center ">
    <div className = "wrapper-content">
  <h1>Special Offers</h1>
  <h3>Available items with offer price for a limited time , Buy your pachage Now</h3>
  <div> <button className = "button" onClick = {() => history.push("/offer")}>Descover Now</button> </div>
  </div>
  </div>
  {accses2 &&
  <div className = "items col-lg col-sm-12 row ">

    <div className = "wrapper-items col d-sm-flex justify-content-sm-center d-flex justify-content-center">
      <div className = "item">
      <div className = "img">
        <img src = {require(`${FetchingOfferItems[0].picUrl}`).default}></img>
      </div>
      <div className = "content">
        <h4>{FetchingOfferItems[0].name}</h4>
        <div className="wrapper">
        <h5><del>{FetchingOfferItems[0].price}$</del></h5>
        <h5>{FetchingOfferItems[0].offer}$</h5>
        </div>
      </div>
      </div>
    </div>

    <div className = "wrapper-items col d-sm-flex justify-content-sm-center d-flex justify-content-center">
    <div className = "item">
      <div className = "img">
        <img src = {require(`${FetchingOfferItems[1].picUrl}`).default}></img>
      </div>
      <div className = "content">
        <h4>{FetchingOfferItems[1].name}</h4>
        <div className="wrapper">
        <h5><del>{FetchingOfferItems[1].price}$</del></h5>
        <h5>{FetchingOfferItems[1].offer}$</h5>
        </div>
      </div>
    </div>


    <div className = "item">
      <div className = "img">
        <img src = {require(`${FetchingOfferItems[2].picUrl}`).default}></img>
      </div>
      <div className = "content">
        <h4>{FetchingOfferItems[2].name}</h4>
        <div className="wrapper">
        <h5><del>{FetchingOfferItems[2].price}$</del></h5>
        <h5>{FetchingOfferItems[2].offer}$</h5>
        </div>
      </div>
    </div>
</div>

    <div className = "wrapper-items col d-sm-flex justify-content-sm-center d-flex justify-content-center ">
      <div className = "item">
      <div className = "img">
        <img  src ={require(`${FetchingOfferItems[3].picUrl}`).default}></img>
      </div>
      <div className = "content">
        <h4>{FetchingOfferItems[3].name}</h4>
        <div className="wrapper">
        <h5><del>{FetchingOfferItems[3].price}$</del></h5>
        <h5>{FetchingOfferItems[3].offer}$</h5>
        </div>
      </div>
      </div>
    </div>
  
  </div>
}
</div>

</section>
{/* sec2 End */}


{/* sec3 start */}
  <section className ="sec3">
   <div className = "header">
     <h3>Recent Items</h3>
   </div>
  {/* ./img/image-not-found-1024x576.png */}
   {!accses && <div className = "loading">loading...</div>}
   <div className = "container">
   <div className = "items-wrapper">
   {accses && randomArray.map((item) => {
     if(dataItems[item]){ 
       return <div className = "item-package" key={ dataItems[item].id } id={ dataItems[item].id }  type={ dataItems[item].type }>
           
            <div className = "img">
              <img className = "watch" src={require(`${ dataItems[item].picUrl}`).default}></img>
            </div>
            <div className = "content">
            <h3>{ dataItems[item].name }</h3>
            <h4>{ dataItems[item].price }$</h4>
            </div>
            {/* check-mark.png */}
          <div className="AddIcon" data-id={ dataItems[item].id}>
            <img src={require("./img/add-to-cart.png").default}  onClick={(e) =>{
              addedTocart(e)
              CartNumberIncreament()
            }}/>
            </div> 
          </div>
       }
          })
          
    }
  </div>
  </div>
 {accses &&<div className = "see-all-btn">
  <button onClick = {() =>{
    handleClick()
    window.scrollTo(0,0)
  }} className = "button margin-top-20px">See All</button>
  </div>
}
  </section>
{/* sec3 End */}
 </div>
 <Footer />
        </Route>
        <Route path = "/price">
          <CardProvider value = {CartNumberIncreamentCounter}>
        <PriceLinkContextProvider value = {resetToallItems}>    
        <Price ref={ref} props2={{addedTocart , CartNumberIncreament}} data={{array,accses1}}  props3={AddedTocartArray} props4 = {{shuffle , fromTo}} props5 = {resetToallItems} />
        </PriceLinkContextProvider>
       </CardProvider>
        </Route>

     

  <Route path="/BestSeller">
  <CardProvider value = {CartNumberIncreamentCounter}>
    <PriceLinkContextProvider value = {resetToallItems}>
    <BestSeller props={CartNumberIncreamentRef} />
   </PriceLinkContextProvider>
    </CardProvider>
  </Route>

  <Route exact path ="/cart">
  <CardProvider value={CartNumberIncreamentCounter}>
    <PriceLinkContextProvider value = {resetToallItems}>
    <Cart props={AddedTocartArray} props2 = {CartNumberdecrement} props3 = {removeFromCart}    />
   </PriceLinkContextProvider>
    </CardProvider>
  </Route>

  <Route path ="/contact">
        <CardProvider value = {CartNumberIncreamentCounter}>
          <PriceLinkContextProvider value = {resetToallItems} >
         <Contact  />
         </PriceLinkContextProvider>
         </CardProvider>
        </Route>


  <Route path="/offer">
  <CardProvider value = {CartNumberIncreamentCounter}>
        <PriceLinkContextProvider value = {resetToallItems}>  
    <Offer props={accses2} props2 = {{CartNumberIncreament , addedtocartofferitem , checkedIcon , uncheckeicon , CartNumberdecrement}} props3={offerItemsArray} />
    </PriceLinkContextProvider >
    </CardProvider>
  </Route>
        </>
    )

}
 
export default Home;