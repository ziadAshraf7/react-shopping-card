import NavBar from "./nav";
import iconsrc from "./img/add-to-cart.png"
import { useEffect, useState } from "react";
const Offer = (props) => {
    let {CartNumberIncreament , addedtocartofferitem , checkedIcon , uncheckeicon , CartNumberdecrement} = props.props2
    let accses2 = props.props
    let offerItemsArray = props.props3
    let [arr , setarr] = useState([])
    let [accses , setaccses] = useState(false)


    useEffect(() =>{
        if(offerItemsArray.length > 0){
            setarr(offerItemsArray)
        }
    },[offerItemsArray.length])

    useEffect(() =>{
        if(arr.length > 1){
            setaccses(true)
        }
    }, [arr.length])

    return ( 
        <>
    <NavBar  />
     <div className="components-wrapper offer-component">
        {accses && arr.map((item) =>{
          return <div className = "item-package" key={ item.id } type={item.type} id={ item.id } checked={item.checked}>
           
          <div className = "img">
            <img className = "watch" src={require(`${item.picUrl}`).default}></img>
          </div>
          <div className = "content">
          <h3>{ item.name }</h3>
          <h4> <del> { item.price }$</del></h4>
          <h4>{ item.offer }$</h4>
          </div>
        <div className="AddIcon" data-id={item.id}>
          <img src={require(`${item.src}`).default}  onClick={(e) =>{
             if(e.target.closest(".item-package").checked === false){
            addedtocartofferitem(e)
            CartNumberIncreament()
            checkedIcon(e)
             }else{
                uncheckeicon(e)
                CartNumberdecrement()
             }
          }}/>
          </div> 
        </div>
        })}
        </div>
        </>
     );
}
 
export default Offer;