import { useState , useEffect  } from "react"
import CardModal from "../Components/card modal/cardModal"
import Header from "../Components/header bar/Header"
import ItemList from "../Components/item list/item_list"
import {getItemsbyOffset, getItemsByCategory, getTotalCategoryItems} from "../Api/Api.js"
import IconButton from '@mui/material/IconButton';
import NorthSharpIcon from '@mui/icons-material/NorthSharp';
import { CardContextProvider } from "../Contexts/Context"




function ShopArea(){
    let [modalOpen , setModalOpen] = useState(false)
    let [categoryId , setCategoryId] = useState(0)
    let [itemsListaData , setItemListData] = useState([])
    let [isLoading , setIsLoading] = useState(true)
    let [isFetching , setIsFetching] = useState()
    let [offset , setOffset] = useState(0)
    let [totalCategoryItemsNumber , setTotalCategoryItemsNumber] = useState()


    useEffect(() =>{
        setIsLoading(true)
        setOffset(0)
        getItemsByCategory(categoryId).then(res => {
            setItemListData(res)
            setIsLoading(false)
        })
        getTotalCategoryItems(categoryId).then(items => setTotalCategoryItemsNumber(items.length))
    },[categoryId])


    function handleItems(){
        setIsFetching(true)
        let newOffset = offset + 20
        getItemsbyOffset(categoryId,newOffset).then(items => {
            setItemListData(prev => [...prev , ...items])
            setOffset(prev => prev + 20)
            setIsFetching(false)
        })
    }

    

    function handleCategoryId(e){
        setCategoryId(e.target.value)
        setIsLoading(true)
        setOffset(0)
        getItemsByCategory(categoryId).then(res => {
            setItemListData(res)
            setIsLoading(false)
        })
        getTotalCategoryItems(categoryId).then(items => setTotalCategoryItemsNumber(items.length))
    }


    return (
     <div>
        <CardContextProvider>

        <CardModal 
        modalOpen = {modalOpen} 
        setModalOpen = {setModalOpen}
        />
        <Header 
        handleCategoryId = {handleCategoryId} 
        categoryId = {categoryId} 
        setModalOpen = {setModalOpen}
        />

        <ItemList 
        isLoading = {isLoading} 
        itemsListaData={itemsListaData} 
        handleItems = {handleItems}
        isFetching = {isFetching}
        offset = {offset.current}
        totalCategoryItemsNumber = {totalCategoryItemsNumber}
        />
      </CardContextProvider>

      <IconButton 
      color="primary" 
      sx = {{
        position : "fixed" , 
        bottom : "40px" , 
        right : "20px"
      }}
      onClick = {() => window.scrollTo({
        top : 0 ,
        behavior: "smooth"
      })}
     >
       <NorthSharpIcon />
      </IconButton>
     </div>
    )



}


export default ShopArea