import React from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CsvUploader from "./assets/components/upload";
import Home from "./home";
import Login from "./assets/components/login";
import Signup from "./assets/components/signup";
import List from "./assets/components/csvfiles";
import LeadDetail from "./assets/components/leaddetail";
import EmailTemplate from "./assets/components/email";

const App=()=>{
  return (
    <BrowserRouter>
    <Routes>
      <Route index element={<Home />} /> 
      <Route path="/email" element={<EmailTemplate />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
     <Route path="/lists" element={<List />} />
     <Route path="/lead/:id" element={<LeadDetail />} />
      
    </Routes>
  </BrowserRouter>
  )
}
export default App;