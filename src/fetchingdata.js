import { useState } from "react";
import { useEffect } from "react";
import React from "react";

const useFetch = (url) => {
  let [data , setdata] = useState('')
  let [accses , setaccses] = useState(false)
  useEffect(() =>{
    fetch(url).then(
      (res) => res.json()
    ).then(
      (res) => {
        {
        setdata(res)
        setaccses(true)
         }
        }
    ).catch(
      (err) => console.log(err)
    )
   
  },[])

  return {data,accses}
}
 
export default useFetch;