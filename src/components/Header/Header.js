import React, { useState, useEffect } from "react";
import logo from "../../assets/img/logo.png";
import userLogin from "../../assets/img/user.svg";
import { useNavigate, Link } from "react-router-dom"; 
import { jwtDecode } from "jwt-decode";
import "./Header.css";
import BASE_URL from "../../config";
const Header = () => {
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState("home");
    const token = localStorage.getItem("token");
    const [fullname, setFullname] = useState("Người dùng");
    const handleUserInfo = async () => {
        try {
          const decoded = jwtDecode(token);
          const id = decoded?.id;
          const response = await fetch(`${BASE_URL}api/v1/userInfor/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          const result = await response.json();
          if (result.status === 200) {
            console.log("User info fetched successfully: ", result);
            const fullName = result.data.fullName;
            const price = result.data.totalMoney;
            setFullname(fullName);
          } else {
            console.error("Failed to fetch user info:", result.message);
          }
        } catch (error) {
          console.error("Error fetching user info:", error);
        } finally {
        
        }
      };
    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                console.log("dec: ", decoded);
               handleUserInfo();
            } catch (error) {
                console.error("Lỗi giải mã token:", error);
                setFullname("Người dùng");
            }
        }
    }, [token]);

    const handleLogout = async () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <header className="header">
            <div className="header-container">
                <Link to="/" className="header-logo">
                    <img src={logo} alt="Logo" className="logo-image" />
                    <span className="logo-text">Real Estate</span>
                </Link>
                <nav className="header-nav">
                    <ul className="header-nav-list center-nav">
                        <li
                            className={`header-nav-item ${activeItem === "home" ? "active" : ""}`}
                            onClick={() => setActiveItem("home")}
                        >
                            <Link to="/" className="header-nav-link header-nav-link__hover">
                                Trang chủ
                            </Link>
                        </li>
                        <li
                            className={`header-nav-item ${activeItem === "news" ? "active" : ""}`}
                            onClick={() => setActiveItem("news")}
                        >
                            <Link to="/news" className="header-nav-link header-nav-link__hover">
                                Tin tức
                            </Link>
                        </li>
                        <li
                            className={`header-nav-item ${activeItem === "app" ? "active" : ""}`}
                            onClick={() => setActiveItem("app")}
                        >
                            <Link to="/downloadapp" className="header-nav-link header-nav-link__hover">
                                Tải app
                            </Link>
                        </li>
                    </ul>

                    {token ? (
                        <ul className="header-nav-list right-nav logged-in-nav">
                            <li className="header-nav-item user-info">
                                <Link to="/overview" className="user-info-link">
                                    <span className="user-name">{fullname}</span>
                                    <img src={userLogin} alt="User Icon" className="user-icon" />
                                </Link>
                            </li>
                            <li className="header-nav-item">
                                <Link to="/post" className="header-nav-button post-button">
                                    Đăng tin
                                </Link>
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
                                <Link to="/login" className="header-nav-link header-nav-button login-button">
                                    Đăng nhập
                                </Link>
                            </li>
                            <li className="header-nav-item">
                                <Link to="/register" className="header-nav-link header-nav-button register-button">
                                    Đăng ký
                                </Link>
                            </li>
                        </ul>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
