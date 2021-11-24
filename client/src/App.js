import React,{Fragment} from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./assets/css/App.css"
import {EmailProvider} from "./contexts/EmailContext"
import UserProvider from "./contexts/UserProvider";
import Landing from "./Landing";
import Login from "./components/sign/Login";
import Signup from "./components/sign/Signup";
import PrivateRoute from "./PrivateRoute"
import Priv from "./Priv"

function App() {
  return (
    <EmailProvider>
      <UserProvider>
        <Router>
          <Fragment>
            <div className="App">
              <Routes>
                <Route exact path="/" element={<Landing/>}></Route>
                <Route exact path='/priv' element={<PrivateRoute/>}>
                  <Route exact path='/priv' element={<Priv/>}/>
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
