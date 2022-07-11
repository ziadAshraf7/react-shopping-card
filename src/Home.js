
import {useNavigate } from "react-router-dom"



 
const UserHome = (props) =>{
   const AddedItemIconURL =  require("./img/—Pngtree—shopping cart icon_5060870.png").default
    const AddItemIconURL = require("./img/add-to-cart.png").default 
    let navigate = useNavigate()
    let RandomFilteredItemsData = props.RandomFilteredItemsData
    let AddedToCartItemsFunc = props.AddedToCartItemsFunc
    let ItemsDataAccess = props.ItemsDataAccess


  
   

    return (

        <>
{/* sec 1 Start*/}
<div className = "section-wrapper"> 
  <section className = "sec1">
    <div className = "cover">
      <img src = {require("./img/3caf4c96e3dfd87e588452d9b62cfaa0.jpg").default} />
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
 <div> <button onClick={() => {
  navigate("../offer")
  window.scrollTo(0,0)
}
  } className = "button" >Descover Now</button> </div>
 </div>
 </div>
</div>

</section>
{/* sec2 End */}



 <section className ="sec3">
  <div className = "header">
    <h3>Recent Items</h3>
  </div>

  {/* {!ItemsDataAccess && <div className = "loading">loading...</div>} */}
  {!ItemsDataAccess && <h3 style={{textAlign : "center"}}>Loading...</h3>}    
  <div className = "container">
    {ItemsDataAccess &&<div className = "items-wrapper">
  {RandomFilteredItemsData.map((item , ItemIndex) => {
    if(RandomFilteredItemsData.length > 0){ 
      return <div className = "item-package" key={ item.id } id={ item.id }  type={ item.type }>
          
           <div className = "img">
             <img className = "watch" src={require(`${ item.picUrl}`).default}></img>
           </div>
           <div className = "content">
           <h3>{ item.name }</h3>
           <h4>{ item.price }$</h4>
           </div>
           <div className="AddIcon" data-id={ item.id}>
           <img  src= {localStorage.getItem(item.id) === "Added" ? AddedItemIconURL : AddItemIconURL }  onClick={(e) =>{
               AddedToCartItemsFunc(item)
           }}/>
           </div> 
         </div>
         
      }
         })  
   }
  
   </div>}
   {ItemsDataAccess && <div className="see-all-btn">
      <button onClick={() => {
        navigate("../price")
        window.scrollTo(0,0)
        }}>See All</button>
    </div>}

 </div>
 </section>
</div>


        
 </>










    )
}

export default UserHome 