import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useStyles } from './cardModalStyles';
import Grid from '@mui/material/Grid';
import CardItem from '../cardItem/cardItem';
import { Divider, Typography } from '@mui/material';
import { useContext } from 'react';
import { CardContext } from '../../Contexts/Context';
import { Container } from "@mui/system";


function CardModal({
  modalOpen , 
  setModalOpen
}){
    const classes = useStyles()

    let {cardItems} = useContext(CardContext)

    let totalPrice = cardItems.reduce((acc , item) =>{
      return (item.price * item.number) + acc
    },0)

    return(
        <>
    <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      >
    {<div className={classes.Modal}>
   
    {cardItems.length == 0 && <Typography sx = {{
          position : "absolute" ,
          top : "50%" , 
          left : "50%" , 
          transform : "translate(-50% , -50%)"
           }} variant='h6'>Card is Empty</Typography>}

         {cardItems.length > 0 && <Container>
           <Box mb = {1}  sx = {{textAlign : "center"}}>
            <Typography variant='h6' sx = {{padding : "10px"}}>Total price : {totalPrice}$</Typography>
            <Divider  />
            </Box>
            <Grid sx = {{height : "430px" , overflowY : "scroll"}} container spacing={2}>
              {cardItems.length > 0 && cardItems.map(cardItemData =>{
                return (
                  <Grid  key = {cardItemData.id} item  xs={12} sm = {6} md = {4} >
                     <CardItem cardItemData={cardItemData} />
                  </Grid>
                )
              })}
        </Grid>
        </Container>
        }

        <CardItem />
        </div>}
      </Modal>
        </>
    )
}


export default CardModal