import React,{useEffect} from 'react'
import IconButton from '@mui/material/IconButton';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const ExerciseCard = (props) => {

    useEffect(()=>{
        // alert(props.arr[0]['name'])
    })

    
    return (
        <>
        <Grid container rowSpacing={7} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {props.arr.map((item, index) => (
              <Grid key={index} item xs={6}>
                <Card key={index} sx={{ minWidth: 320 }} style={{background:'linear-gradient(to right, #E9A6A6,#864879, #009DAE)'}}>
                    <CardContent key={index}>
                        <Typography variant="h4" component="div" color="white" style={{fontFamily:'inherit'}}>
                        I did
                        </Typography>
                        <Typography style={{fontFamily:'inherit'}} variant="h3" color="white">
                        {item.name}
                        </Typography>
                        {/* <Typography style={{fontFamily:'inherit'}} variant="h6" color="white">
                        hours.
                        <br />
                        </Typography> */}
                    </CardContent>
                    <CardActions>
                        <IconButton key={index} onClick={()=>alert(index)}>
                            <RemoveCircleOutlineIcon/>
                        </IconButton>
                    </CardActions>
                </Card>
            </Grid> 
        //    </div>
           
         ))}
         </Grid>
         

     </>
    )
}

export default ExerciseCard
