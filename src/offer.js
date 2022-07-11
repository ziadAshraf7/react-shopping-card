const Offer = (props) => {
    const AddedItemIconURL =  require("./img/—Pngtree—shopping cart icon_5060870.png").default
    const AddItemIconURL = require("./img/add-to-cart.png").default 
    let {OfferItems , OfferItemsAccses , AddedToCartItemsFunc} = props.props


    return ( 
        <div className="components-wrapper">
         {!OfferItemsAccses && <h3 style={{textAlign : "center"}}>Loading...</h3>} 
     <div className="offer-component">
        {OfferItems && OfferItems.length > 0 && OfferItems.map((item , index) =>{
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
          <img src={localStorage.getItem(item.id) === "Added" ? AddedItemIconURL : AddItemIconURL }  onClick={(e) =>{
           AddedToCartItemsFunc(item)
          }}/>
          </div> 
        </div>
        })}
     
        </div>
        </div>
     );
}
 
export default Offer;