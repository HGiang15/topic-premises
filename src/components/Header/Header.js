import React, {useState, useEffect} from "react";
import logo from "../../assets/img/logo.png";
import userLogin from "../../assets/img/user.svg";
import { useAuth } from "../../components/AuthContext/AuthContext.js";
import "./Header.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Header = () => {
    const navigate = useNavigate(); 

    const token = localStorage.getItem("token");
    const [fullname, setFullname] = useState("Người dùng");
    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token); 
                console.log("dec: ", decoded)
                setFullname(decoded?.fullName || "Người dùng"); 
            } catch (error) {
                console.error("Lỗi giải mã token:", error);
                setFullname("Người dùng"); 
            }
        }
    }, [token]);

    const handleLogout = async () => {
        // try {
        //     await axios.post(
        //         "http://localhost:8080/login",
        //         {},
        //         {
        //             headers: {
        //                 Authorization: `Bearer ${token}`, 
        //             },
        //         }
        //     );
            localStorage.removeItem("token");
            navigate("/");
        // } catch (error) {
        //     console.error("Đăng xuất thất bại:", error);
        // }
    };

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

                    {token ? (
                        <ul className="header-nav-list right-nav logged-in-nav">
                            <li className="header-nav-item user-info">
                                <a href="/overview" className="user-info-link">
                                    <span className="user-name">{fullname}</span>
                                    <img src={userLogin} alt="User Icon" className="user-icon" />
                                </a>
                            </li>
                            <li className="header-nav-item">
                                <a href="/post" className="header-nav-button post-button">
                                    Đăng tin
                                </a>
                            </li>
                            <li className="header-nav-item">
                                <button className="logout-button" onClick={handleLogout}>
                                    Đăng xuất
                                </button>
                            </li>
                        </ul>
                    ) : (
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
