import React from "react";
import logo from "../../assets/img/logo.png";
import userLogin from "../../assets/img/user.svg";
import { useAuth } from "../../components/AuthContext/AuthContext.js";
import "./Header.css";

const Header = () => {
    const { user, logout } = useAuth(); // Lấy thông tin user và hàm logout

    return (
        <header className="header">
            <div className="header-container">
                <a href="/" className="header-logo">
                    <img src={logo} alt="Logo" className="logo-image" />
                    <span className="logo-text">Real Estate</span>
                </a>
                <nav className="header-nav">
                    <ul className="header-nav-list center-nav">
                        <li className="header-nav-item">
                            <a href="/" className="header-nav-link header-nav-link__hover">
                                Trang chủ
                            </a>
                        </li>
                    </ul>

                    {user ? (
                        // UI khi đã đăng nhập
                        <ul className="header-nav-list right-nav logged-in-nav">
                            <li className="header-nav-item user-info">
                                <a href="/overview" className="user-info-link">
                                <span className="user-name">{user.fullname || "Người dùng"}</span> {/* Hiển thị fullname */}
                                    <img src={userLogin} alt="User Icon" className="user-icon" />
                                </a>
                            </li>
                            <li className="header-nav-item">
                                <a href="/post" className="header-nav-button post-button">
                                    Đăng tin
                                </a>
                            </li>
                            <li className="header-nav-item">
                                <button className="logout-button" onClick={logout}>
                                    Đăng xuất
                                </button>
                            </li>
                        </ul>
                    ) : (
                        // UI khi chưa đăng nhập
                        <ul className="header-nav-list right-nav">
                            <li className="header-nav-item">
                                <a href="/login" className="header-nav-link header-nav-button login-button">
                                    Đăng nhập
                                </a>
                            </li>
                            <li className="header-nav-item">
                                <a href="/register" className="header-nav-link header-nav-button register-button">
                                    Đăng ký
                                </a>
                            </li>
                        </ul>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
