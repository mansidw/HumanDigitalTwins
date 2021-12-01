import React from 'react'
import IconButton from '@mui/material/IconButton';
import LinkIcon from '@mui/icons-material/Link';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const JobCard = (props) => {

    
    return (
        <>
        <Grid container rowSpacing={7} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {props.arr.map((item, index) => (
        //    <div key={index}>
              <Grid key={index} item xs={6}>
                <Card key={index} sx={{ minWidth: 320 }} style={{background:'linear-gradient(to right,#E9A6A6,#864879, #009DAE)'}}>
                    <CardContent key={index}>
                        <Typography variant="h3" >{item.company_name}</Typography>
                        <Typography variant="h4" component="div" color="white" style={{fontFamily:'inherit'}}>
                        Role : {item.role}
                        </Typography>
                        <Typography style={{fontFamily:'inherit'}} variant="h5" color="white">
                        Remote : {item.remote.toString()}
                        </Typography>
                        <br />
                    </CardContent>
                    <CardActions>
                        <IconButton key={index} onClick={()=>window.open(item.url)}>
                            <LinkIcon/>
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

export default JobCard
