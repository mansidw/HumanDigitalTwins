import React, { useContext, useState, useRef, useEffect } from 'react';
import '../../assets/css/login.css'
import '../../assets/css/tailwind.css'
import { useNavigate } from "react-router-dom"
import { UserContext } from '../../contexts/UserProvider';
import Alert from '@mui/material/Alert';
import { firestore } from '../../services/firebase';
import { useAuth } from '../../contexts/EmailContext';
import { NavigationMenu, Header } from '../basic/Header'

const MyProfile = () => {
    const navigate = useNavigate()
    const[message,setMessage] = useState()
    const nameRef = useRef()
    const emailRef = useRef()
    const ageRef = useRef()
    const heightRef = useRef()
    const weightRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()

    const { currentUser, updatePassword, updateEmail } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const user = useContext(UserContext)

    useEffect(()=>{
        firestore.collection("users").doc(user['uid'])
        .get()
        .then((doc) => {
            if (doc.exists) {
              setMessage(doc.data())
          }})
          .catch((error) => {
            console.log("Error getting document:", error);
        });
    
      },[])

 ////////////////////////////////////// for Header ///////////////////////////////    
    
    const[navOpen,setNavOpen] = useState(false)
    const[navIsAnimating,setNavIsAnimating] = useState(false)
    const loggedInUser = {'GET JOBS':'/jobs','MY HEALTH':'/health/foodcalories','MY PRODUCTIVITY':'/','MY PROFILE':'/myprofile','HOW WE WORK?':'/','HOME':'/'}
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

    function handleSubmit(e) {
        e.preventDefault()
        if(currentUser){
            if (passwordRef.current.value !== passwordConfirmRef.current.value) {
                return setError("Passwords do not match")
            }
        }
        
        const promises = []
        setError("")
        setLoading(true)
        // if(user){var rnuser=user['uid']}
        // else{var rnuser=currentUser.uid}
        // console.log(rnuser)
        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
          }
          if (nameRef.current.value !== message.name) {
            promises.push(
              firestore.collection("users").doc(user['uid'])
              .update({ name:nameRef.current.value},{merge:true}))
          }
          if (ageRef.current.value !== message.age) {
            promises.push(
              firestore.collection("users").doc(user['uid'])
              .update({ age:ageRef.current.value},{merge:true}))
          }
          if (weightRef.current.value !== message.weight) {
            promises.push(
              firestore.collection("users").doc(user['uid'])
              .update({ weight:weightRef.current.value},{merge:true}))
          }
          if (heightRef.current.value !== message.height) {
            promises.push(
              firestore.collection("users").doc(user['uid'])
              .update({ height:heightRef.current.value},{merge:true}))
          }
          if(currentUser){
            if (passwordRef.current.value) {
                promises.push(updatePassword(passwordRef.current.value))
              }
        }
          
      
          Promise.all(promises)
            .then(() => {
              navigate("/")
            })
            .catch(() => {
              setError("Failed to update account")
            })
            .finally(() => {
              setLoading(false)
        })
        
    }

  const FormHeader = props => (
    <h2 id="headerTitle">{props.title}</h2>
  );
  
  
  const Form = props => (
   <form onSubmit={handleSubmit}>
     <FormInput/>
     <FormButton title="Update"/>
   </form>
  );
  
  const FormButton = props => (
  <div id="button" class="row">
    <button type="submit" disabled={loading}>{props.title}</button>
  </div>
  );
  
  const FormInput = () => (
      message?
    <>
    <div className="row">
      <label>Name</label>
      <input ref={nameRef} type="text" defaultValue={message.name} />
    </div>

    <div class="row">
      <label>Email</label>
      <input ref={emailRef} type="email" defaultValue={currentUser.email} />
    </div>
    
    <div class="row">
      <label>Age</label>
      <input ref={ageRef} type="number" defaultValue={message.age} />
    </div>

    <div class="row">
      <label>Height</label>
      <input ref={heightRef} type="number" defaultValue={message.height} />
    </div>

    <div class="row">
      <label>Weight</label>
      <input ref={weightRef} type="number" defaultValue={message.weight} />
    </div>

    <div class="row">
      <label>Password</label>
      <input ref={passwordRef} type="password" placeholder="Leave blank to keep the same" />
    </div>

    <div class="row">
      <label>Password</label>
      <input ref={passwordConfirmRef} type="password" placeholder="Leave blank to keep the same" />
    </div>
  </>
:<></>
  );
  
  
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
            <div id="loginform" style={{marginBottom:"10px"}}>
                {error && <Alert severity="error">{error}</Alert>}
                <FormHeader title="Profile Details" />
                <Form />
            </div>
        </div>
  )
}

export default MyProfile



