import React,{Fragment} from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./assets/css/App.css"
import {EmailProvider} from "./contexts/EmailContext"
import UserProvider from "./contexts/UserProvider";
import Landing from "./Landing";
import Login from "./components/sign/Login";
import Signup from "./components/sign/Signup";
import PrivateRoute from "./PrivateRoute"
import Healthmain from "./components/health/Healthmain";
import AddDetails from "./components/sign/AddDetails";
import MyProfile from "./components/sign/MyProfile";
import Result from "./components/health/Result";
import ExerciseMain from "./components/health/ExerciseMain"
import JobMain from "./components/jobs/JobMain";

function App() {
  return (
    <EmailProvider>
      <UserProvider>
        <Router>
          <Fragment>
            <div className="App">
              <Routes>
                <Route exact path="/" element={<Landing/>}></Route>
                <Route exact path='/addDetails' element={<PrivateRoute/>}>
                  <Route exact path='/addDetails' element={<AddDetails/>}/>
                </Route>
                <Route exact path='/jobs' element={<PrivateRoute/>}>
                  <Route exact path='/jobs' element={<JobMain/>}/>
                </Route>
                <Route exact path='/health/foodcalories' element={<PrivateRoute/>}>
                  <Route exact path='/health/foodcalories' element={<Healthmain/>}/>
                </Route>
                <Route exact path='/health/exercisecalories/:id' element={<PrivateRoute/>}>
                  <Route exact path='/health/exercisecalories/:id' element={<ExerciseMain/>}/>
                </Route>
                <Route exact path='/health/result/:id' element={<PrivateRoute/>}>
                  <Route exact path='/health/result/:id' element={<Result/>}/>
                </Route>
                <Route exact path='/myprofile' element={<PrivateRoute/>}>
                  <Route exact path='/myprofile' element={<MyProfile/>}/>
                </Route>                
                <Route exact path="/login" element={<Login/>}></Route>
                <Route exact path="/signup" element={<Signup/>}></Route>
              </Routes>
            </div>
          </Fragment>
        </Router>
      </UserProvider>
    </EmailProvider>
    
  );
}

export default App;
