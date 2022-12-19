import { useEffect, useState } from "react"



function useLocalStorage(){
    let [cardItems , setCardItems] = useState(() => {
        if(localStorage.cardItems){
            return JSON.parse(localStorage.cardItems)
        }else{
            localStorage.cardItems = JSON.stringify([])
            return []
        }
    })


    useEffect(() =>{
    localStorage.cardItems = JSON.stringify(cardItems)
    },[cardItems])

    return [cardItems , setCardItems]
}

export default useLocalStorage