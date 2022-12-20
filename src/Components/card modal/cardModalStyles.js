import { makeStyles } from '@mui/styles';




export const useStyles = makeStyles(theme =>({
   Modal : {
        position : "relative" , 
        width : "85%" , 
        top : "50%" , 
        left : "50%" , 
        transform : "translate(-50% , -50%)" ,
        height : "90%" , 
        border : "none" ,
        outline : "none" ,
        backgroundColor: theme.palette.background.paper,
        zIndex : 10
   }
  }));