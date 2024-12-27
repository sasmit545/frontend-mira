
import React from 'react'
import './App.css'
import Login from './assets/components/login'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import axios from 'axios'
import Header from './assets/components/header';
import Mainpage from './assets/components/frontpage';
export default function Home() {



async function checkAuth(token){

  try {
    const data= await axios.get('https://mira-js.onrender.com/api/user/auth', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
  
    if(data.data.message==='OK'){
      setLog(true)
    }
    
  } catch (error) {
    console.log(error)
    
  }
 

}



  const [log,setLog]=useState(false)

  React.useEffect(
    () => {
      const token = localStorage.getItem('token');
      console.log(token)
      if (token) {
        checkAuth(token)

      }
      
    }
    
    ,[])
  

  return(
    <div>
      {
        log?
        <div>
          <Header />
          <Mainpage />
        </div>
        
        :
        <Login setLog={setLog} />
      }



    </div>
      
    

  )
  
}

