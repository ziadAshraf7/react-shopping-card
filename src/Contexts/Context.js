import { createContext } from "react";
import useLocalStorage from "../Hooks/useLocalStorage"




export const CardContext = createContext()



export function CardContextProvider({children}){

    let [cardItems , setCardItems] = useLocalStorage()

    function addToCard(cardItem){
        setCardItems(prev =>[...prev , {...cardItem , number : 1}])
    }

    function handleCardItemNumber(cardItem , count){
        let cardItemIndex 
        let targetCardItem = cardItems.find((item , index) =>{ 
            if(item.id == cardItem.id){
                cardItemIndex = index
                return true
            }
        })

        if(count == -1 && targetCardItem.number == 1){
            removeFromCard(cardItem)
        }else{
            cardItems[cardItemIndex] = {
                ...targetCardItem , 
                number : targetCardItem.number + count
            }
            setCardItems([...cardItems])
        }
    }

    function removeFromCard(cardItem){
        let cardItemIndex = cardItems.findIndex(item => item.id == cardItem.id)
        cardItems.splice(cardItemIndex , 1)
        setCardItems([...cardItems])
    }


    return (
        <CardContext.Provider value = {{cardItems , addToCard , handleCardItemNumber , removeFromCard}}>
            {children}
        </CardContext.Provider>
    )

}




