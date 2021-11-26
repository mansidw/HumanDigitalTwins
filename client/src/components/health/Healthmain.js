import React, { useContext, useState, useRef, useEffect } from 'react';
import '../../assets/css/login.css'
import '../../assets/css/tailwind.css'
import "../../assets/css/healthmain.css"
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import back from "../../assets/img/health3.png"
import MenuItem from '@mui/material/MenuItem';
import { NavigationMenu, Header } from '../basic/Header'

////////////////////////////////////// for card ///////////////////////////////
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



////////////////////////////////////// for card ///////////////////////////////


const Healthmain = () => {
    const [currency, setCurrency] = React.useState('EUR');

    const handleChange = (event) => {
        setCurrency(event.target.value);
    };

    ////////////////////////////////////// for Header ///////////////////////////////    
    
    const[navOpen,setNavOpen] = useState(false)
    const[navIsAnimating,setNavIsAnimating] = useState(false)
    const loggedInUser = {'GET JOBS':'/','MY PRODUCTIVITY':'/','MY PROFILE':'/myprofile','HOW WE WORK?':'/','HOME':'/'}
 
    const toggleNav = (event) => {
        event.preventDefault();

        if (event) event.preventDefault();
        setNavIsAnimating(true)
        if (navOpen) document.body.classList.remove('nav-open');
        if (!navOpen) document.body.classList.add('nav-open');
        setTimeout(() => {
            setNavIsAnimating(false)
            setNavOpen((navOpen)=>!navOpen)
        }, 500);
      };
    
      const openNav = (event) => {
        if (event) event.preventDefault();
        document.body.classList.add('nav-open');
        setNavOpen(true)
      };
    
      const closeNav = () => {
        document.body.classList.remove('nav-open');
        setNavOpen(false)
      };
////////////////////////////////////// for Header ///////////////////////////////    
const quantity = [
    {
      value: 'bowl',
      label: 'bowl',
    },
    {
        value: 'cup',
        label: 'cup',
      },
      {
        value: 'jar',
        label: 'jar',
      },
      {
        value: 'plate',
        label: 'plate',
      },
      {
        value: 'serving',
        label: 'serving',
      },
      {
        value: 'slice',
        label: 'slice',
      },
      {
        value: 'tablespoon',
        label: 'tablespoon',
      },
      {
        value: 'kgs',
        label: 'kgs',
      },
      {
        value: 'gms',
        label: 'gms',
      },
    
  ];

    return (
        <div className="layout">
            
            <Header
                navOpen={navOpen}
                toggleNavHandler={event => toggleNav(event)}
                navIsAnimating={navIsAnimating}
            />
            <NavigationMenu
                a="1"
                tabs={loggedInUser}
                navOpen={navOpen}
                navIsAnimating={navIsAnimating}
                closeNav={event => closeNav(event)}
                toggleNavHandler={event => toggleNav(event)}
            />
            
            <div className="div1">
                <div className="div2">
                    <h1 className='head1'>Whatcha Eating?</h1>
                    <div className="div3">
                        <div className="div4">
                        <p style={{fontSize: "1.25em", lineHeight: "1.4", marginTop: "-5px"}}>
                            Just fill in the boxes to tell us what you had and how much. (Don't forget to include the cheat dishes 😁)
                            So I ate a hearty ❤️ meal of ....
                        </p>
                        
                            
                        </div>
                        <div className="div5">
                        <Stack direction="row" spacing={2}>
                            <div><TextField style={{marginTop:'20px',width:'200px'}} id="outlined-basic" label="What?" variant="outlined" /></div>
                            <div><TextField style={{marginTop:'20px',width:'200px'}} type="number" id="outlined-basic" label="How much?" variant="outlined" /></div>

                            <div><TextField
                            id="outlined-select-currency"
                            select
                            label="Measure"
                            value={currency}
                            onChange={handleChange}
                            style={{marginTop:'20px',width:'100px'}}
                            >
                            {quantity.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                            </TextField></div>
                        
                        </Stack>
                        
                        
                        </div>
                        
                    </div>
                    <Box sx={{ width: '50%',marginLeft:'350px', marginTop:'30px' }}>
                    <Grid container rowSpacing={7} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={6}>
                            <Card sx={{ minWidth: 275 }} style={{background:'linear-gradient(to right, #FFCA03, #009DAE)'}}>
                            <CardContent>
                                <Typography variant="h4" component="div" color="white" style={{fontFamily:'inherit'}}>
                                I have eaten
                                </Typography>
                                <Typography style={{fontFamily:'inherit'}} variant="h2" color="white">
                                adjective
                                </Typography>
                                <Typography style={{fontFamily:'inherit'}} variant="h6" color="white">
                                well happily.
                                <br />
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                    <RemoveCircleOutlineIcon fontSize="large" style={{color:"white"}}/>
                                </IconButton>
                            </CardActions>
                            </Card>

                            
                        </Grid>

                        <Grid item xs={6}>
                            <Card sx={{ minWidth: 275 }} style={{background:'linear-gradient(to right, #FFCA03, #009DAE)'}}>
                            <CardContent>
                                <Typography variant="h4" component="div" color="white" style={{fontFamily:'inherit'}}>
                                I have eaten
                                </Typography>
                                <Typography style={{fontFamily:'inherit'}} variant="h2" color="white">
                                adjective
                                </Typography>
                                <Typography style={{fontFamily:'inherit'}} variant="h6" color="white">
                                well happily.
                                <br />
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                    <RemoveCircleOutlineIcon fontSize="large" style={{color:"white"}}/>
                                </IconButton>
                            </CardActions>
                            </Card>

                            
                        </Grid>

                        <Grid item xs={6}>
                            <Card sx={{ minWidth: 275 }} style={{background:'linear-gradient(to right, #FFCA03, #009DAE)'}}>
                            <CardContent>
                                <Typography variant="h4" component="div" color="white" style={{fontFamily:'inherit'}}>
                                I have eaten
                                </Typography>
                                <Typography style={{fontFamily:'inherit'}} variant="h2" color="white">
                                adjective
                                </Typography>
                                <Typography style={{fontFamily:'inherit'}} variant="h6" color="white">
                                well happily.
                                <br />
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                    <RemoveCircleOutlineIcon fontSize="large" style={{color:"white"}}/>
                                </IconButton>
                            </CardActions>
                            </Card>

                            
                        </Grid>
                    </Grid>
                    </Box>
                    <div className="div7">
                        
                    </div>
                </div>
            </div>
            <div className="col col-right col-image">
            <img
              className="astro"
              src={back}
              height="150px" />
          </div>
        </div>
    )
}

export default Healthmain

