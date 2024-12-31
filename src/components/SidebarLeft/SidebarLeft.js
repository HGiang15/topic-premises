import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import user from "../../assets/img/user.svg";
import user1 from "../../assets/icons/user.svg";
import overview from "../../assets/icons/overview.svg";
import manage from "../../assets/icons/manage.svg";
import "./SidebarLeft.css";

const SidebarLeft = () => {
    const [activeMenu, setActiveMenu] = useState("/overview");
    const navigate = useNavigate();  

    const handleMenuClick = (path) => {
        setActiveMenu(path); 
        navigate(path); 
    };

    return (
        <div className="sidebar-left">
            <div className="sidebar-left-header">
                <img src={user} alt="Avatar" className="sidebar-avatar" />
                <h3>Nguyễn Đăng Hoàng Giang</h3>
                <div className="account-balance">
                    <span>Số dư tài khoản</span>
                    <h4>100.000 VND</h4>
                    <button className="recharge-button">Nạp tiền</button>
                </div>
            </div>
            <div className="sidebar-left-menu">
                <div
                    className={`menu-item ${activeMenu === "/overview" ? "active" : ""}`}
                    onClick={() => handleMenuClick("/overview")}
                >
                    <img src={overview} alt="Tổng quan" className="menu-icon" />
                    <span className="menu-text">Tổng quan</span>
                </div>
                <div
                    className={`menu-item ${activeMenu === "/managepost" ? "active" : ""}`}
                    onClick={() => handleMenuClick("/managepost")}
                >
                    <img src={manage} alt="Quản lý tin đăng" className="menu-icon" />
                    <span className="menu-text">Quản lý tin đăng</span>
                </div>
                <div
                    className={`menu-item ${activeMenu === "/manageinfo" ? "active" : ""}`}
                    onClick={() => handleMenuClick("/manageinfo")}
                >
                    <img src={user1} alt="Quản lý tài khoản" className="menu-icon" />
                    <span className="menu-text">Quản lý tài khoản</span>
                </div>
            </div>
        </div>
    );
};

export default SidebarLeft;
