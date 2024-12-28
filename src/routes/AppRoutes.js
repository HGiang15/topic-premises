import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from "react-router-dom";
import Home from "../containers/Home/Home";
import Detail from "../containers/Detail/Detail";
import Login from "../containers/Login/Login";
import Register from "../containers/Register/Register";
import ForgotPassword from './../containers/ForgotPassword/ForgotPassword';
import Chatbot from "../containers/Chatbot/Chatbot";
import Header from "../components/Header/Header";
import Filter from "../components/Filter/Filter";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {
    const location = useLocation();

    // no Filter route chatbot
    const showFilter = location.pathname !== "/chatbot";

    return (
        <div>
            <Header />
            {showFilter && <Filter />}
            <div className="main-content">
                <Outlet /> {/* các component con */}
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
                    <Route path="/chatbot" element={<Chatbot />} />
                </Route>

                {/* route no Header, Filter */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
