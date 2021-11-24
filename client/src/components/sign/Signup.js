import React, { useState, useRef,useContext } from 'react';
import '../../assets/css/login.css'
import '../../assets/css/tailwind.css'
import { Link,useNavigate } from "react-router-dom"
import Alert from '@mui/material/Alert';
import { UserContext } from '../../contexts/UserProvider';
import { useAuth } from '../../contexts/EmailContext';
import { signInWithGoogle } from '../../services/firebase';
import AddDetails from './AddDetails';

const Signup = () => {
    const navigate = useNavigate()
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmpasswordRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const user = useContext(UserContext)

    async function handleSubmit(a) {
        if(a==0){
            if (passwordRef.current.value !== confirmpasswordRef.current.value) {
                return setError("Passwords do not match")
            }
            try {
                setError("")
                setLoading(true)
                await signup(emailRef.current.value,passwordRef.current.value)
                navigate("/addDetails")//change
            } catch {
                setError("Failed to sign up! Try Again :(")
            }
        }
        // else{
        //     setLoading(true)
        //     signInWithGoogle();
        //     navigate("/addDetails")//change
        // }
      setLoading(false)
    }

  const FormHeader = props => (
    <h2 id="headerTitle">{props.title}</h2>
  );
  
  
  const Form = props => (
   <form onSubmit={()=>handleSubmit(0)}>
     <FormInput/>
     <FormButton title="Sign In"/>
   </form>
  );
  
  const FormButton = props => (
  <div id="button" class="row">
    <button type="submit" disabled={loading}>{props.title}</button>
  </div>
  );
  
  const FormInput = () => (
    <>
    <div className="row">
      <label>Email</label>
      <input ref={emailRef} type="email" placeholder="Enter your Email" />
    </div>
    
    <div class="row">
      <label>Password</label>
      <input ref={passwordRef} type="password" placeholder="Enter your Password" />
    </div>

    <div class="row">
      <label>Confirm Password</label>
      <input ref={confirmpasswordRef} type="password" placeholder="Enter your Password again" />
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
    !user?
      <>
    <div id="loginform" style={{marginBottom:"10px"}}>
      {error && <Alert severity="error">{error}</Alert>}
      <FormHeader title="Sign Up" />
      <Form />
      <OtherMethods/>
    </div>
    Already have an account? <Link to="/login">Log In</Link>
    </>:<AddDetails/>)
  
}

export default Signup



