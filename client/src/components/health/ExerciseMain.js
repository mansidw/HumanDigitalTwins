import React, { useContext, useState, useRef, useEffect} from 'react';
import {useParams} from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "../../assets/css/healthmain.css"
import { UserContext } from '../../contexts/UserProvider';
import Stack from '@mui/material/Stack';
import back from "../../assets/img/yoga2.png"
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { NavigationMenu, Header } from '../basic/Header'
import ExerciseCard from './ExerciseCard';
import Box from '@mui/material/Box';
import { firestore } from '../../services/firebase';


import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const ExerciseMain = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [exercises, setExercises] = useState([])
    const [weight,setWeight] = useState(0)
    const timeRef = useRef()
    const [cal,setCal] = useState(0)
    const user = useContext(UserContext)
    const navigate = useNavigate()

////////////////////////////////////// for Header ///////////////////////////////    
    
    const[navOpen,setNavOpen] = useState(false)
    const[navIsAnimating,setNavIsAnimating] = useState(false)
    const loggedInUser = {'GET JOBS':'/jobs','MY PRODUCTIVITY':'/','MY PROFILE':'/myprofile','HOW WE WORK?':'/','HOME':'/'}
    
    let {id} = useParams()
    
 
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

useEffect(async ()=>{
    firestore.collection("mets").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            setExercises((old)=>[...old,{'key':doc.id,'name':doc.data()['Specific Motion'],'value':doc.data()['Value']}])
        });
        
    });

    const userRef = firestore.collection('users').doc(user['uid']);
    const doc = await userRef.get();
    if (!doc.exists) {
        console.log('No such document!');
    } else {
        setWeight(doc.data()['weight'])
    }
    
},[])
    
const handleChange = (event, value) => setSelectedOptions(value);

const handleSubmit =async (e) => {
    e.preventDefault();
    console.log(selectedOptions)
    selectedOptions.map((item,index)=>{
        setCal((old)=>old+(item.value)*weight)
    })
    setCal((old)=>old*timeRef.current.value)
}

const fillcaldb=async ()=>{
    console.log("came in fillcal")
    
    const res = await firestore.collection("balances").doc(id).update({ exercise:cal})
      
    console.log('updated document');
    navigate(`/health/result/${id}`)
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
                    <h1 className='head1'>Lounging Enough?</h1>
                    <div className="div3">
                        <div className="div4">
                        <p style={{fontSize: "1.25em", lineHeight: "1.4", marginTop: "-5px"}}>
                            Just fill in the boxes to tell us what you did and for how long. P.S. Must include activities like lounging 😎 and binging 😂
                        </p>
                        
                            
                        </div>
                        <div className="div5">
                                <form onSubmit={handleSubmit} >
                                    <Stack direction="row" spacing={2}>
                                        <div style={{marginTop:'20px'}}>
                                            <Autocomplete
                                                multiple
                                                id="checkboxes-tags-demo"
                                                options={exercises}
                                                onChange={handleChange}
                                                disableCloseOnSelect
                                                getOptionLabel={(option) => option['name']}
                                                renderOption={(props, option, { selected }) => (
                                                    <li {...props}>
                                                    <Checkbox
                                                        icon={icon}
                                                        checkedIcon={checkedIcon}
                                                        style={{ marginRight: 8 }}
                                                        checked={selected}
                                                    />
                                                    {option['name']}
                                                    </li>
                                                )}
                                                style={{ width: 500 }}
                                                renderInput={(params) => (
                                                    <TextField {...params} label="Work Done" placeholder="Work" />
                                                )}
                                                />
                                        </div>
                                        <div><TextField style={{marginTop:'20px',width:'200px'}} type="number" id="outlined-basic" label="Time (in hours)" variant="outlined" inputRef={timeRef} /></div>
                                        <div><Button variant="contained" type="submit" style={{width:'150px',height:'60px',fontFamily:'inherit',fontWeight:'bold',fontSize:'20px',backgroundColor:'darkblue',color:'white',marginTop:'15px'}}>Done</Button></div> 
                                        
                                    </Stack>
                                </form>
                        
                        </div>
                        
                        
                    </div>
                    <h1 style={{fontSize:'30px'}}>The calories you burnt is <span style={{lineHeight:'50px',fontWeight:'bold'}}>{cal}</span> calories!</h1>
                    <Box sx={{ width:'50%',marginLeft:'350px', marginTop:'70px' }}>
                          
                          <ExerciseCard arr={selectedOptions}/>
                        
                    </Box>
                    <Button variant="contained" onClick={()=>fillcaldb()} style={{width:'150px',height:'60px',fontFamily:'inherit',fontWeight:'bold',fontSize:'20px',backgroundColor:'darkblue',color:'white',marginTop:'15px'}}>Results</Button>  
                        
                    <div className="div7">
                      

                    </div>
                </div>
            </div>
            <div className="col col-image">
            <img
              className="astro"
              src={back}
              height="150px" />
            
          </div>
        </div>
    )
}

export default ExerciseMain;

