import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from "react-router-dom";
import Home from "../containers/Home/Home";
import Detail from "../containers/Detail/Detail";
import Overview from "../containers/Overview/Overview";  
import ManagePost from './../containers/ManagePost/ManagePost';
import ManageInfo from './../containers/ManageInfo/ManageInfo';
import Post from "../containers/Post/Post";  
import Login from "../containers/Login/Login";
import Register from "../containers/Register/Register";
import ForgotPassword from './../containers/ForgotPassword/ForgotPassword';
import Header from "../components/Header/Header";
import Filter from "../components/Filter/Filter";
import Sidebar from "../components/Sidebar/Sidebar";
import SidebarLeft from './../components/SidebarLeft/SidebarLeft';
import Footer from "../components/Footer/Footer";
import './AppRoutes.css'
import AddressMap from "../containers/AddressMap/AddressMap";
import Dashboards from "../containers/Dashboards/Dashboards";

// MainLayout: Được sử dụng cho các route chỉ có Header, Footer và Filter: /home, /detail.
// SimpleLayout: Được sử dụng cho các route chỉ có Header và Footer:  /overview, /post.
const MainLayout = () => {
    const location = useLocation();

    // no Filter route overview, post
    const showFilterAndSidebar =
        location.pathname !== "/overview" &&
        location.pathname !== "/post";

    return (
        <div>
            <Header />
            {showFilterAndSidebar && <Filter />}
            <div className="main-layout-content">
                <div className="main-layout-container">
                    <Outlet />
                </div>
                {showFilterAndSidebar && <Sidebar />} 
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
                <Outlet /> 
            </div>
            <Footer />
        </div>
    );
};

// OverviewLayout: Dành riêng cho trang Overview (có SidebarLeft).
const OverviewLayout = () => {
    return (
        <div>
            <Header />
            <div className="overview-layout-content">
                <SidebarLeft />
                <div className="overview-layout-main">
                    <Outlet />
                </div>
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
                    <Route path="/detail/:id" element={<Detail />} />
                    
                </Route>
                
                {/* route Header, Footer, không Filter */}
                <Route element={<SimpleLayout />}>
                    <Route path="/post" element={<Post />} />
                    <Route path="/addressMap" element={<AddressMap />} />
                </Route>

                {/* route SidebarLeft */}
                <Route element={<OverviewLayout />}>
                    <Route path="/overview" element={<Overview />} />
                    <Route path="/managepost" element={<ManagePost />} />
                    <Route path="/manageinfo" element={<ManageInfo />} />
                    <Route path="/dashboards" element={<Dashboards />} />
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
