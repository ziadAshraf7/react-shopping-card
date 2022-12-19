import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import IconButton from '@mui/material/IconButton';
import { useContext, useState } from 'react';
import { CardContext } from '../../Contexts/Context';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
function Item({
  itemData
}){

  let {addToCard , removeFromCard , cardItems} = useContext(CardContext)
  let [snackBarOpen , setSnackBarOpen] = useState(false)

  let isItemInCard = cardItems.find(item => item.id == itemData.id)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackBarOpen(false);
  };


  const action = (
    <>
      <Button color="secondary" size="small" onClick={() => {
        removeFromCard(itemData)
        setSnackBarOpen(false)
        }}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

    return (
        <>
         <Snackbar
        open={snackBarOpen}
        autoHideDuration={2000}
        onClose={handleClose}
        message="added to card"
        action={action}
      />
    <Card >
      <CardMedia
        component="img"
        alt="failed to load the pic"
        height="220"
        image= { itemData.images[0]  }
      />
      <CardContent sx = {{
        textAlign : "center"
      }}>
        <Typography  sx = {{fontSize : "12px" , color : "grey"}} component="p">
            {itemData?.title}
        </Typography>
        <Typography  variant = {"h4"}>
            {itemData?.price}$
        </Typography>
      </CardContent>

      <Box sx = {{
        display : "flex" , 
        justifyContent : "space-between"
      }}>
        <Rating name="read-only" value={3} readOnly />
           <IconButton 
           color="primary" aria-label="upload picture" component="label">
            {isItemInCard ? <RemoveShoppingCartIcon onClick = {() =>{
              removeFromCard(itemData)
              setSnackBarOpen(false)
            }} /> : <ShoppingCartCheckoutIcon onClick = {() =>{
              addToCard(itemData)
              setSnackBarOpen(true)
            }} />}
            </IconButton>
      </Box>
    </Card>
        </>
    )
}

export default Item