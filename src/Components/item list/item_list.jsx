import { useStyles } from "./itemListStyles"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Item from "../item/item";
import { Container } from "@mui/system";
import { limit } from "../../Api/Api";
import Skeleton from '@mui/material/Skeleton';
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress';



function ItemList({
    isLoading ,
    itemsListaData,
    handleItems ,
    isFetching ,
    totalCategoryItemsNumber 
}){
    const classes = useStyles()


    if(isLoading){
        return (
            <div className={classes.root}>
             <Box sx = {theme =>{return {height : theme.mixins.toolbar.minHeight , padding : "8px"}}}></Box>
           
             <Container>
             <Grid container spacing={2}>
                {Array.from(new Array(limit)).map((_ , i) => {
                    return (
                        <Grid key = {i} item xs={12} sm = {6} md = {4} lg = {3}>
                          <Skeleton variant="rectangular" width={"100%"} height={118}  />
                          <Skeleton />
                          <Skeleton width="60%" />
                        </Grid>
                    )
                })}
        </Grid>
        </Container>
            </div>
        )
    }
    return (
       <div className={classes.root}>
        <Box sx = {theme =>{return {height : theme.mixins.toolbar.minHeight , padding : "8px"}}}></Box>
        
        <div>
        <Container>

        <Grid container spacing={2}>
                {itemsListaData?.map(itemData => {
                    return (
                        <Grid key = {itemData.id} item xs={12} sm = {6} md = {4} lg = {3}>
                        <Item  itemData={itemData} />
                        </Grid>
                    )
                })}
        </Grid>

        <Box mt = {3} sx = {{textAlign : "center"}}>
        {itemsListaData.length !== totalCategoryItemsNumber && 
        <LoadingButton
          sx = {{
            width : "250px"
         }}
          endIcon = {isFetching && <CircularProgress size = {20} /> }
          onClick={handleItems} 
          loading = {isFetching}
          variant="contained"
          color = "error"
          loadingPosition="end"
        >
          Load more
        </LoadingButton>}
        </Box>

        </Container>

        </div>
       </div>
    )
}


export default ItemList