import React, { useEffect, useContext, useState, useRef } from 'react';
import '../../assets/css/login.css'
import '../../assets/css/tailwind.css'
import { useNavigate } from "react-router-dom"
import { signInWithGoogle } from '../../services/firebase';
import { UserContext } from '../../contexts/UserProvider';
import Landing from '../../Landing';
import Alert from '@mui/material/Alert';
import { useAuth } from '../../contexts/EmailContext';

const Login = () => {
    const navigate = useNavigate()
    const emailRef = useRef()
    const passwordRef = useRef()
    const { currentUser, login } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const user = useContext(UserContext)

    if(user || currentUser){
      navigate('/')
    }
    

    async function handleSubmit(e) {
      e.preventDefault()
    
      try {
        setError("")
        setLoading(true)
        await login(emailRef.current.value,passwordRef.current.value)
        navigate("/")
      } catch {
        setError("Failed to log in! Try Again :(")
      }
  
      setLoading(false)
    }

  const FormHeader = props => (
    <h2 id="headerTitle">{props.title}</h2>
  );
  
  
  const Form = props => (
   <form onSubmit={handleSubmit}>
     <FormInput/>
     <FormButton title="Log in"/>
   </form>
  );
  
  const FormButton = props => (
  <div id="button" class="row">
    <button type="submit" disabled={loading}>{props.title}</button>
  </div>
  );
  
  const FormInput = () => (
    <>
    <div class="row">
      <label>Email</label>
      <input ref={emailRef} type="email" placeholder="Enter your Email" />
    </div>
    
    <div class="row">
      <label>Password</label>
      <input ref={passwordRef} type="password" placeholder="Enter your Password" />
    </div>
  </>
  );
  
  const OtherMethods = props => (
  <div id="alternativeLogin">
    <label>Or sign in with:</label>
    <div id="iconGroup">
      <Google />
    </div>
  </div>
  );
  
  
  const Google = props => (
      <button
        className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
        type="button" onClick={signInWithGoogle}
      >
        <img
        alt="..."
        className="w-5 mr-1"
        src={require("../../assets/img/google.svg").default}
        />          
    </button>  
  );
  
  return (
    !user && !currentUser?
    <div id="loginform">
      {error && <Alert severity="error">{error}</Alert>}
      <FormHeader title="Login" />
      <Form />
      <OtherMethods/>
    </div>:<Landing/>
  )
}

export default Login



