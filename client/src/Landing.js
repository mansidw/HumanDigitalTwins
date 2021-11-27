import React,{useState,useContext} from 'react'
import { NavigationMenu, Header } from './components/basic/Header'
import { UserContext } from './contexts/UserProvider';
import {useAuth} from "./contexts/EmailContext"
import "./assets/css/landing.css"
import slide1 from './assets/img/slide1.gif'
import slide2 from './assets/img/slide2.png'
import slide3 from './assets/img/slide3.png'
import slide4 from './assets/img/slide4.gif'
import slide5 from './assets/img/slide5.gif'
import Coverflow from "react-coverflow"


const Landing = () => {
    
    const user = useContext(UserContext)
    const { currentUser } = useAuth()

////////////////////////////////////// for Header ///////////////////////////////    
  

    const[navOpen,setNavOpen] = useState(false)
    const[navIsAnimating,setNavIsAnimating] = useState(false)
    const loggedInUser = {'GET JOBS':'/','MY HEALTH':'/health/foodcalories','MY PRODUCTIVITY':'/','MY PROFILE':'/myprofile','HOW WE WORK?':'/'}
    const notloggedInUser = {'LOGIN':'/login','JOIN':'/signup','HOW WE WORK?':'/'}
    
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
    return (
        <div className="layout">
          {user || currentUser?
          <>
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
          /></>:
          <>
            <Header
              navOpen={navOpen}
              toggleNavHandler={event => toggleNav(event)}
              navIsAnimating={navIsAnimating}
              />
            <NavigationMenu
                a="0"
                tabs={notloggedInUser}
                navOpen={navOpen}
                navIsAnimating={navIsAnimating}
                closeNav={event => closeNav(event)}
                toggleNavHandler={event => toggleNav(event)}
            />
            </>}
            
            <h1 style={{fontSize:'100px', textShadow: "0px 2px 2px rgba(0, 105, 157, 0.3)",fontFamily:'Special Elite',lineHeight:'100px'}}><span style={{fontWeight:'bold',fontSize:'200px',lineHeight:'200px'}}>H</span>uman <span style={{fontWeight:'bold',fontSize:'200px',lineHeight:'200px'}}>D</span>igital <span style={{fontWeight:'bold',fontSize:'200px',lineHeight:'200px'}}>T</span>wins</h1>
            <hr className="rounded"/>
            
            <div style={{backgroundColor:'transparent'}}>
            <Coverflow
              width={1500}
              height={600}
              displayQuantityOfSide={2}
              navigation={false}
              infiniteScroll={true}
              enableHeading={false}
              enableScroll={true}
              currentFigureScale={2}
              otherFigureScale={1}
              style={{backgroundColor:"white"}}
            >
              <div
                role="menuitem"
                tabIndex="0"
              >
                <img
                  src={slide1}
                  alt='title or description'
                  style={{ display: 'block', width: '100%' }}
                />
              </div>
              <img src={slide2} alt='title or description'/>
              <img src={slide3} alt='title or description'/>
              <img src={slide4} alt='title or description'/>
              <img src={slide5} alt='title or description'/>
            </Coverflow>
            </div>
            
        
      </div>
    )
}

export default Landing
