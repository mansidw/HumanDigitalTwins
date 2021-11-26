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
                <Route exact path='/health' element={<PrivateRoute/>}>
                  <Route exact path='/health' element={<Healthmain/>}/>
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
