import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Box from '@mui/material/Box';
import { useStyles } from './headerStyles';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import {
    useQuery,
  } from 'react-query'
import { getCategories } from "../../Api/Api";
import { useContext, useEffect, useState } from 'react';
import { CardContext } from '../../Contexts/Context';



function Header({
    categoryId , 
    handleCategoryId ,
    setModalOpen
}){
    const classes = useStyles()
    let [categories , setCategories] = useState([])

    let {cardItems} = useContext(CardContext)

    useEffect(() =>{
      getCategories().then(res => setCategories(res))
    },[])

    return (
        <div>
    <AppBar
        position="fixed"
    >
        <Toolbar className={classes.toolbar}>
            <Box sx = {theme => { return{
                fontSize : "25px" , 
                letterSpacing : 2
            }}}>Shopify</Box>
        <Select
        sx = {theme => {return{
          backgroundColor : "white" , 
          width : "250px" , 
          height : "35px"
        }}}
        onChange={handleCategoryId}
        value = {categoryId}
        >
          <MenuItem
          onClick = {() => window.scrollTo({
            top : 0 ,
            behavior : "smooth"
          })}
          value={0}>
            <em>All</em>
          </MenuItem>
            {categories?.map(item =>{
              return  <MenuItem onClick = {() => window.scrollTo({
                top : 0 ,
                behavior : "smooth"
              })} key = {item.id} value={item.id}>{item.name}</MenuItem>
            })}
        </Select>

        <IconButton onClick={() => setModalOpen(prev => !prev)}>
        <Badge
            showZero= {false}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            badgeContent={cardItems.length} 
            color="error"
            >
            <ShoppingCartOutlinedIcon
                fontSize="medium"
            />
            </Badge>
            </IconButton>
        </Toolbar>
    </AppBar>
        </div>
    )
}

export default Header