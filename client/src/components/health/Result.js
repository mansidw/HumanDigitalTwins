import React,{useEffect,useContext,useState} from 'react'
import { useParams } from 'react-router'
import { firestore } from '../../services/firebase';
import { NavigationMenu, Header } from '../basic/Header'
import "../../assets/css/healthmain.css"
import { UserContext } from '../../contexts/UserProvider';
import Success from './Success';
import Failure from './Failure';

const Result = () => {
    const user = useContext(UserContext)
    const [diff,setDiff] = useState(0)
    const [cal,setCal] = useState(0)
    var {id} = useParams()


    useEffect(async ()=>{
        const balanceRef = firestore.collection('balances').doc(id);
        const doc = await balanceRef.get();
        if (!doc.exists) {
            console.log('No such document!');
        } else {
            console.log(doc.data())
            if(doc.data()['food']-doc.data()['exercise']>=0){
                setDiff(0)
            }
            else {
                setDiff(1)
            }
            setCal(doc.data()['food']-doc.data()['exercise'])
        }
    },[])



////////////////////////////////////// for Header ///////////////////////////////    
    
    const[navOpen,setNavOpen] = useState(false)
    const[navIsAnimating,setNavIsAnimating] = useState(false)
    const loggedInUser = {'GET JOBS':'/jobs','MY PRODUCTIVITY':'/','MY PROFILE':'/myprofile','HOW WE WORK?':'/','HOME':'/'}
    
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
            {!diff?<Failure cal={cal} id={id}/>:<Success cal={-cal} id={id}/>}
            </div>
    )
}

export default Result
