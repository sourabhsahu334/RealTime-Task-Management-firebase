import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignInForm from './screens/login';
import SignUpForm from './screens/signup';
import Dashboard from './screens/dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<SignInForm/> } />
        <Route path="/signup" element={<SignUpForm/>} />
        <Route path="/" element={<h1>WELCOME TO THE REVOLTUON AI </h1>} />
        <Route path="/dashboard" element={<Dashboard/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
