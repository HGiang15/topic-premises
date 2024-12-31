import React from "react";
import logo from "../../assets/img/logo.png";
import userLogin from "../../assets/img/user.svg";
import "./Header.css";

const Header = () => {
    return (
        <header className="header">
            <div className="header-container">
                <a href="/" className="header-logo">
                    <img src={logo} alt="N3 Topic Logo" className="logo-image" />
                    <span className="logo-text">Real Estate</span>
                </a>
                <nav className="header-nav">
                    <ul className="header-nav-list center-nav">
                        <li className="header-nav-item">
                            <a href="/" className="header-nav-link header-nav-link__hover">
                                Trang chủ
                            </a>
                        </li>
                        <li className="header-nav-item">
                            <a href="/chatbot" className="header-nav-link header-nav-link__hover">
                                Chatbot
                            </a>
                        </li>
                    </ul>

                    {
                        // Đoạn này bỏ comment để test 2 trường hợp UI chưa login và UI login
                    }

                    {
                        // UI not login
                        // <ul className="header-nav-list right-nav">
                        //     <li className="header-nav-item">
                        //         <a href="/login" className="header-nav-link header-nav-button login-button">
                        //             Đăng nhập
                        //         </a>
                        //     </li>
                        //     <li className="header-nav-item">
                        //         <a href="/register" className="header-nav-link header-nav-button register-button">
                        //             Đăng ký
                        //         </a>
                        //     </li>
                        // </ul>
                    }

                    {
                        // UI login
                        <ul className="header-nav-list right-nav logged-in-nav">
                            <li className="header-nav-item user-info">
                                <a href="/overview" className="user-info-link">
                                    <span className="user-name">hgiang15</span>
                                    <img src={userLogin} alt="User Icon" className="user-icon" />
                                </a>
                            </li>
                            <li className="header-nav-item">
                                <a href="/#" className="header-nav-button post-button">
                                    Đăng tin
                                </a>
                            </li>
                        </ul>
                    }
                </nav>
            </div>
        </header>
    );
};

export default Header;
