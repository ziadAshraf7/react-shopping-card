import { useState } from "react";
import { useEffect } from "react";

const useDataFetching = (url) => {
  let [data , setdata] = useState('')
  let [accses , setaccses] = useState(false)
  
  useEffect(() =>{
    fetch(url).then(
      (res) => res.json()
    ).then(
      (res) => {
        {
    if(!accses){
        setdata(res)
        setaccses(true)
    }
         }
        }
    ).catch(
      (err) => console.log(err)
    )
   

      return () => setaccses(true)


  },[])

  return {data,accses}
}
 
export default useDataFetching;