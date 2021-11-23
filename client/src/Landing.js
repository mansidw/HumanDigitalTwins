import React,{useState,useContext} from 'react'
import { NavigationMenu, Header } from './components/basic/Header'
import { UserContext } from './contexts/UserProvider';
import { Navigate } from "react-router-dom";

const Landing = () => {
    const[navOpen,setNavOpen] = useState(false)
    const[navIsAnimating,setNavIsAnimating] = useState(false)
    // const user = useContext(UserContext)

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
    return (
        <div className="layout">
            <Header
                navOpen={navOpen}
                toggleNavHandler={event => toggleNav(event)}
                navIsAnimating={navIsAnimating}
            />
            <NavigationMenu
                navOpen={navOpen}
                navIsAnimating={navIsAnimating}
                closeNav={event => closeNav(event)}
                toggleNavHandler={event => toggleNav(event)}
            />
            <h1>this is landing page</h1>
        
      </div>
    )
}

export default Landing
