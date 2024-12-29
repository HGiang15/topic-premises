import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from "react-router-dom";
import Home from "../containers/Home/Home";
import Detail from "../containers/Detail/Detail";
import Overview from "../containers/Overview/Overview";  
import Post from "../containers/Post/Post";  
import Login from "../containers/Login/Login";
import Register from "../containers/Register/Register";
import ForgotPassword from './../containers/ForgotPassword/ForgotPassword';
import Chatbot from "../containers/Chatbot/Chatbot"; 
import Header from "../components/Header/Header";
import Filter from "../components/Filter/Filter";
import Footer from "../components/Footer/Footer";

// MainLayout: Được sử dụng cho các route chỉ có Header, Footer và Filter: /home, /detail.
// SimpleLayout: Được sử dụng cho các route chỉ có Header và Footer: /chatbot, /overview, /post.
const MainLayout = () => {
    const location = useLocation();

    // no Filter route chatbot, overview, post
    const showFilter = location.pathname !== "/chatbot" && location.pathname !== "/overview" && location.pathname !== "/post";

    return (
        <div>
            <Header />
            {showFilter && <Filter />}
            <div className="main-content">
                <Outlet /> {/* component con */}
            </div>
            <Footer />
        </div>
    );
};

const SimpleLayout = () => {
    return (
        <div>
            <Header />
            <div className="main-content">
                <Outlet /> {/* component con */}
            </div>
            <Footer />
        </div>
    );
};

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                {/* route Header, Filter */}
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/detail" element={<Detail />} />
                </Route>

                {/* route Header, Footer, không Filter */}
                <Route element={<SimpleLayout />}>
                    <Route path="/chatbot" element={<Chatbot />} />
                    <Route path="/overview" element={<Overview />} />
                    <Route path="/post" element={<Post />} />
                </Route>

                {/* route no Header, Filter, Footer */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
