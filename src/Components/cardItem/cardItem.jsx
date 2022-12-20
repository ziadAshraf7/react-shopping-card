import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useContext } from 'react';
import { CardContext } from '../../Contexts/Context';


function CardItem({
  cardItemData
}){

  let { handleCardItemNumber , removeFromCard} =  useContext(CardContext)

    if(!cardItemData){
      return
    }
    return (
        <>
 <Card >
      <CardMedia
        component="img"
        alt="failed to load the pic"
        height="220"
        image= {cardItemData.images[0]}
      />
      <CardContent sx = {{
        textAlign : "center"
      }}>
        <Typography  sx = {{fontSize : "12px" , color : "grey"}} component="p">
        {cardItemData.title}
        </Typography>
        <Typography  variant = {"h4"}>
            {cardItemData.price}$
        </Typography>
      </CardContent>

      <Box sx = {{
        display : "flex" , 
        justifyContent : "space-evenly" , 
        alignItems : "center"
      }}>
        <IconButton onClick = {() => handleCardItemNumber(cardItemData , -1)}>
          <RemoveCircleIcon  />
        </IconButton>
        <Typography variant = {"h5"}>{cardItemData.number}</Typography>
        <IconButton onClick = {() => handleCardItemNumber(cardItemData , 1)}>
          <AddCircleIcon  />
        </IconButton>
      </Box>
      <Box mb = {3} sx = {{textAlign : "center"}}>
       <Button onClick = {() => {
        removeFromCard(cardItemData)
        }} variant='contained' color = "error">Remove</Button>
      </Box>
    </Card>
        </>
    )
}


export default CardItem