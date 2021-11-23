import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./assets/css/App.css"
import {EmailProvider} from "./contexts/EmailContext"
import UserProvider from "./contexts/UserProvider";
import Landing from "./Landing";
import Login from "./components/sign/Login";
import Logout from "./components/sign/Logout";

function App() {
  return (
    <EmailProvider>
      <UserProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route exact path="/" element={<Landing/>}></Route>
              <Route exact path="/login" element={<Login/>}></Route>
              <Route exact path="/logout" element={<Logout/>}></Route>
            </Routes>
          </div>
        </Router>
      </UserProvider>
    </EmailProvider>
    
  );
}

export default App;
