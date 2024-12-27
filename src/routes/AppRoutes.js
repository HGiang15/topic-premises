import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../containers/Home/Home';
import Detail from '../containers/Detail/Detail';
import Login from '../containers/Login/Login';
import Register from './../containers/Register/Register';
import Chatbot from './../containers/Chatbot/Chatbot';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/detail" element={<Detail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/chatbot" element={<Chatbot />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
