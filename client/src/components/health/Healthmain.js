import React, { useContext, useState, useRef, useEffect } from 'react';
import '../../assets/css/login.css'
import '../../assets/css/tailwind.css'
import "../../assets/css/healthmain.css"
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import back from "../../assets/img/health3.png"
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { NavigationMenu, Header } from '../basic/Header'
import EatenCard from './EatenCard';


const Healthmain = () => {
    const[arr,setArr] = useState([]);
    const foodRef = useRef()
    const quantRef = useRef()
    const currencyRef = useRef()

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
      value: 'bar',
      label: 'bar',
    },
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

const removeFood=(a)=>{
    console.log(a)
}

function handleSubmit(event){
    event.preventDefault();
    console.log(foodRef.current.value)
    setArr((oldval)=>
        [...oldval,{'name':foodRef.current.value,'quant':quantRef.current.value,'scoop':currencyRef.current.value}]
    )
}



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
                                <form onSubmit={handleSubmit}>
                                    <Stack direction="row" spacing={2}>
                                        <div><TextField style={{marginTop:'20px',width:'200px'}} id="outlined-basic" label="What?" variant="outlined" inputRef={foodRef} /></div>
                                
                                        <div><TextField style={{marginTop:'20px',width:'200px'}} type="number" id="outlined-basic" label="How much?" variant="outlined" inputRef={quantRef} /></div>
                                    
                                        <div>
                                            <TextField
                                            id="outlined-select-currency"
                                            select
                                            label="Measure"
                                            inputRef={currencyRef}
                                            style={{marginTop:'20px',width:'120px'}}
                                            >
                                            {quantity.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                                </MenuItem>
                                            ))}
                                            </TextField>
                                        </div>
                                        <div><Button variant="contained" type="submit" style={{width:'150px',height:'60px',fontFamily:'inherit',fontWeight:'bold',fontSize:'20px',backgroundColor:'darkblue',color:'white',marginTop:'15px'}}>Done</Button></div>
                                    </Stack>
                                </form>
                        
                        </div>
                        
                    </div>
                     
                        {arr?<EatenCard arr={arr} remove={removeFood}/>:<></>}
                        
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

