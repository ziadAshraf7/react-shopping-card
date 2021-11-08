import React, { useEffect, useState } from "react";
import NavBar from "./nav";



const BestSeller = (props) => {
  let ref = props.props
    return(
      <section className = "sec1">
          <NavBar ref = {ref} />
          <div className = "components-wrapper">
              <h1>best seller items</h1>
          </div>
      </section>
    )

   
}
 
export default BestSeller;
   

 


