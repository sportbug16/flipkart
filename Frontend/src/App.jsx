import React from 'react';
import Signup from './Components/Signup.jsx';
import Login from './Components/Login.jsx';
// import NavBar from './Components/NavBar.jsx';
// import Home from './Components/Home.jsx';
import Edpro from '../src/Components/editprofile.jsx';

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Ppage from './Components/profilepage.jsx'
import Chat from "./Components/chat";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/main" element={<Chat/>} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="/login" element ={<Login/>} />
                <Route path="/edpro" element={<Edpro/>} />
                <Route path="/prof" element={<Ppage/>} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
