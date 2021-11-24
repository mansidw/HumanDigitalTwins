import React, { useContext, useState, useRef } from 'react';
import '../../assets/css/login.css'
import '../../assets/css/tailwind.css'
import { useNavigate } from "react-router-dom"
import { UserContext } from '../../contexts/UserProvider';
import Alert from '@mui/material/Alert';
import { firestore } from '../../services/firebase';
import { useAuth } from '../../contexts/EmailContext';

const AddDetails = () => {
    const navigate = useNavigate()
    const nameRef = useRef()
    const ageRef = useRef()
    const heightRef = useRef()
    const weightRef = useRef()
    const maleRef = useRef()
    const femaleRef = useRef()

    const { currentUser } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const user = useContext(UserContext)
    
    function handleSubmit(e) {
        e.preventDefault()
        var rnuser;
        var rngend;
        setError("")
        setLoading(true)
        if(user){
            console.log("mai google")
            rnuser=user['uid']
            console.log(rnuser)
        }else{
            console.log("mai normal")
            rnuser=currentUser.uid
            console.log(rnuser)
        }

        if(maleRef.current.value=='on'){
            console.log("mai aadmi")
            rngend="M"
        }
        else{
            console.log("mai aurat")
            rngend="F"
        }
        firestore.collection("users").doc(rnuser).set({
            name:nameRef.current.value,
            age:ageRef.current.value,
            weight:weightRef.current.value,
            height:heightRef.current.value,
            gender:rngend
        })
        .then(() =>navigate("/"))
        .catch(error => {
            setError("Failed to update account")
            console.error("Error writing document: ", error);
        })
        .finally(() =>setLoading(false))
    }

  const FormHeader = props => (
    <h2 id="headerTitle">{props.title}</h2>
  );
  
  
  const Form = props => (
   <form onSubmit={handleSubmit}>
     <FormInput/>
     <FormButton title="Done!"/>
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
      <label>Name</label>
      <input ref={nameRef} type="text" placeholder="Enter your Name" />
    </div>
    
    <div class="row">
      <label>Age</label>
      <input ref={ageRef} type="number" placeholder="Enter your Age" />
    </div>

    <div class="row">
      <label>Height</label>
      <input ref={heightRef} type="number" placeholder="Enter your Height in cms" />
    </div>

    <div class="row">
      <label>Weight</label>
      <input ref={weightRef} type="number" placeholder="Enter your Weight in Kgs" />
    </div>

    <div class="row">
      <label>Gender</label>
      <input ref={femaleRef} type="radio" id="female" name="gender" value="Female"/>
      <label for="female">Female</label><br/>
      <input ref={maleRef} type="radio" id="male" name="gender" value="Male"/>
      <label for="male">Male</label><br/>
    </div>
  </>
  );
  
  
  return (
    <div id="loginform" style={{marginBottom:"10px"}}>
      {error && <Alert severity="error">{error}</Alert>}
      <FormHeader title="More about you!" />
      <Form />
    </div>
  )
}

export default AddDetails



