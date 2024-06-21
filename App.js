import './App.css';
import React from "react";
import Login from './Components/Login/Login';
import Registration from './Components/Registration/Registration'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes> 
   </div>
    </Router>
    
  );
}

export default App;
