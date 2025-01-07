import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import user from "../../assets/img/user.svg";
import user1 from "../../assets/icons/user.svg";
import overview from "../../assets/icons/overview.svg";
import manage from "../../assets/icons/manage.svg";
import chart from "../../assets/icons/chart.svg";
import success from "../../assets/icons/success.svg";
import cancel from "../../assets/icons/cancel.svg";
import "./SidebarLeft.css";

const SidebarLeft = () => {
    const [fullname, setFullname] = useState("Người dùng");
    const [activeMenu, setActiveMenu] = useState("/overview");
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
    const [balance, setBalance] = useState(100000); // Account balance
    const [transactionAmount, setTransactionAmount] = useState(""); // Transaction amount
    const [isNotificationOpen, setIsNotificationOpen] = useState(false); // Notification state
    const [isTransactionSuccess, setIsTransactionSuccess] = useState(false); // Success or failure of transaction
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token); 
                console.log("Decoded token:", decoded);
                setFullname(decoded?.fullName || "Người dùng");  // Set fullname from decoded token
            } catch (error) {
                console.error("Error decoding token:", error);
                setFullname("Người dùng"); 
            }
        }
    }, [token]);

    const handleMenuClick = (path) => {
        setActiveMenu(path);
        navigate(path);
    };

    const handleRecharge = () => {
        const amount = parseInt(transactionAmount, 10);
        if (isNaN(amount) || amount <= 0) {
            setIsTransactionSuccess(false);
            setIsNotificationOpen(true); 
            setTransactionAmount(""); 
            setIsModalOpen(false);
            return;
        }
        setBalance(balance + amount);
        setTransactionAmount("");
        setIsModalOpen(false);
        setIsTransactionSuccess(true); 
        setIsNotificationOpen(true); 
    };

    const closeNotification = () => {
        setIsNotificationOpen(false);
    };

    return (
        <div className="sidebar-left">
            <div className="sidebar-left-header">
                <img src={user} alt="Avatar" className="sidebar-avatar" />
                <h3 className="sidebar-left-heading">{fullname}</h3> {/* Display fullname */}
                <div className="account-balance">
                    <span>Số dư tài khoản</span>
                    <h4>{balance.toLocaleString()} VND</h4>
                    <button
                        className="recharge-button"
                        onClick={() => setIsModalOpen(true)} 
                    >
                        Nạp tiền
                    </button>
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
                <div
                    className={`menu-item ${activeMenu === "/dashboards" ? "active" : ""}`}
                    onClick={() => handleMenuClick("/dashboards")}
                >
                    <img src={chart} alt="Quản lý tài khoản" className="menu-icon" />
                    <span className="menu-text">Biểu đồ tổng quan</span>
                </div>
            </div>

            {/* Modal for Recharge */}
            {isModalOpen && (
                <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
                    <div
                        className="modal-recharge"
                        onClick={(e) => e.stopPropagation()} 
                    >
                        <button className="modal-close" onClick={() => setIsModalOpen(false)}>
                            &times;
                        </button>
                        <h2 className="modal-heading">Nạp tiền</h2>
                        <p className="modal-title">Nhập số tiền bạn muốn nạp</p>
                        <form className="modal-form" onSubmit={(e) => e.preventDefault()}>
                            <input
                                className="modal-form-input"
                                type="number"
                                placeholder="Nhập số tiền..."
                                value={transactionAmount}
                                onChange={(e) => setTransactionAmount(e.target.value)}
                            />
                            <button className="modal-form-btn" type="button" onClick={handleRecharge}>
                                Xác nhận
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Notification Modal */}
            {isNotificationOpen && (
                <div className="modal-backdrop" onClick={closeNotification}>
                    <div
                        className="modal-content notification-modal"
                        onClick={(e) => e.stopPropagation()} 
                    >
                        <button className="modal-close" onClick={closeNotification}>
                            &times;
                        </button>
                        {isTransactionSuccess ? (
                            // TH Successfully
                            <div className="notification-content">
                                <img src={success} alt="Success" className="notification-icon" />
                                <h2 className="modal-heading">Nạp tiền thành công</h2>
                                <p className="modal-title">Số dư hiện tại: {balance.toLocaleString()} VND</p>
                                <div className="notification-buttons">
                                    <button
                                        className="notification-buttons-close notification-buttons-close__back"
                                        onClick={() => {
                                            navigate("/overview");
                                            closeNotification();
                                        }}
                                    >
                                        Trở về
                                    </button>
                                    <button
                                        className="notification-buttons-close"
                                        onClick={() => {
                                            navigate("/managepost");
                                            closeNotification();
                                        }}
                                    >
                                        Quản lý tin
                                    </button>
                                </div>
                            </div>
                        ) : (
                            // TH Failed
                            <div className="notification-content">
                                <img src={cancel} alt="Cancel" className="notification-icon" />
                                <h2 className="modal-heading">Nạp tiền thất bại</h2>
                                <p className="modal-title">Vui lòng nhập số tiền hợp lệ!</p>
                                <div className="notification-buttons">
                                    <button  
                                        className="notification-buttons-close notification-buttons-close__back"
                                        onClick={() => {
                                            navigate("/overview");
                                            closeNotification();
                                        }}
                                    >
                                        Trở về
                                    </button>
                                    <button
                                        className="notification-buttons-close"
                                        onClick={() => {
                                            navigate("/managepost");
                                            closeNotification();
                                        }}
                                    >
                                        Quản lý tin
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SidebarLeft;
