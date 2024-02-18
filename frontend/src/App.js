import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registrations from './components/registrations/registrations';
import Home from './components/home/home';
import QrGenerator from './components/qrGenerator/qrGenerator';
import React from 'react';
function App() {
  return (
    <BrowserRouter>
   <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/registrations"  element={<Registrations />}/>
      <Route path="/qrGenerator" element={<QrGenerator />}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;