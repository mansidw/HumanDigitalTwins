import React, { useContext, useState, useRef} from 'react';
import "../../assets/css/healthmain.css"
import { UserContext } from '../../contexts/UserProvider';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import back from "../../assets/img/job3.png"
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { NavigationMenu, Header } from '../basic/Header'
import axios from 'axios'
import Box from '@mui/material/Box';
import { firestore } from '../../services/firebase';
import { getStorage, ref } from "firebase/storage";
import { useNavigate } from "react-router-dom"


const JobMain = () => {
    // const[title,setTitle] = useState('');
    const[image,setImage] = useState(null);
    // const[content,setContent] = useState('');
    // const[cal,setCal] = useState(0)
    const titleRef = useRef()
    const contentRef = useRef()
    // const currencyRef = useRef()
    const navigate = useNavigate()
    const user = useContext(UserContext)

////////////////////////////////////// for Header ///////////////////////////////    
    
    const[navOpen,setNavOpen] = useState(false)
    const[navIsAnimating,setNavIsAnimating] = useState(false)
    const loggedInUser = {'MY HEALTH':'/health/foodcalories','MY PRODUCTIVITY':'/','MY PROFILE':'/myprofile','HOW WE WORK?':'/','HOME':'/'}
 
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


async function handleSubmit(event){
    event.preventDefault();
    console.log(titleRef.current.value,contentRef.current.value,image);
    let form_data = new FormData();
    form_data.append('image', image, image.name);
    form_data.append('title', titleRef.current.value);
    form_data.append('content', contentRef.current.value);
    console.log(form_data)
    // let url = 'http://localhost:8000/api/posts/';
    // axios.post(url, form_data, {
    //   headers: {
    //     'content-type': 'multipart/form-data'
    //   }
    // })
    //     .then(res => {
    //       console.log(res.data);
    //     })
    //     .catch(err => console.log(err))
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0])
  };


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
                    <h1 className='head1'>Know your Jobs?</h1>
                    <div className="div3">
                        <div className="div4">
                        <p style={{fontSize: "1.25em", lineHeight: "1.4", marginTop: "-5px"}}>
                            In one click know the jobs for you. Just upload your resume and know your skills 🤓
                        </p>
                        
                            
                        </div>
                        <div className="div5">
                                <form onSubmit={handleSubmit}>
                                    <Stack direction="row" spacing={2}>
                                        <div><TextField style={{marginTop:'20px',width:'200px'}} id="outlined-basic" label="Title of the file" variant="outlined" inputRef={titleRef} /></div>
                                
                                        <div><TextField style={{marginTop:'20px',width:'200px'}} type="text" id="outlined-basic" label="Content of the File" variant="outlined" inputRef={contentRef} /></div>
                                    
                                        <div><input style={{marginTop:'30px'}} type="file" id="image" accept="pdf"  onChange={handleImageChange} required/></div>
                                        <div><Button variant="contained" type="submit" style={{width:'150px',height:'60px',fontFamily:'inherit',fontWeight:'bold',fontSize:'20px',backgroundColor:'darkblue',color:'white',marginTop:'15px'}}>Upload</Button></div>
                                        {/* <div><Button variant="contained" onClick={()=>alert('yes')} style={{width:'150px',height:'60px',fontFamily:'inherit',fontWeight:'bold',fontSize:'20px',backgroundColor:'darkblue',color:'white',marginTop:'15px'}}>Let's Balance</Button></div> */}
                                    </Stack>
                                </form>
                        
                        </div>
                        
                    </div>
                        {/* <h1 style={{fontSize:'30px'}}>Your calorie intake is <span style={{lineHeight:'50px',fontWeight:'bold'}}>{cal}</span> calories!</h1>
                        <Box sx={{ width:'50%',marginLeft:'350px', marginTop:'70px' }}>
                          
                            <EatenCard arr={arr}/>
                          
                        </Box> */}
                        
                        
                        
                    <div className="div7">
                      

                    </div>
                </div>
            </div>
            <div className="col col-image">
            <img
              className="astro"
              src={back}
              style={{height:'500px',width:'400px'}} />
          </div>
        </div>
    )
}

export default JobMain

