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
import favorite from "../../assets/icons/favorite.svg";
import "./SidebarLeft.css";
import BASE_URL from "../../config";
const SidebarLeft = () => {
    const [fullname, setFullname] = useState("Người dùng");
    //   const [price, setPrice] = useState("");
    const [activeMenu, setActiveMenu] = useState("/overview");
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
    const [balance, setBalance] = useState(""); // Account balance
    const [transactionAmount, setTransactionAmount] = useState(""); // Transaction amount
    const [isNotificationOpen, setIsNotificationOpen] = useState(false); // Notification state
    const [isTransactionSuccess, setIsTransactionSuccess] = useState(false); // Success or failure of transaction
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        // if (token) {
        //   try {
        //     const decoded = jwtDecode(token);
        //     console.log("Decoded token:", decoded);
        //     setFullname(decoded?.fullName || "Người dùng");
        //   } catch (error) {
        //     console.error("Error decoding token:", error);
        //     setFullname("Người dùng");
        //   }
        // }
        handleUserInfo();
    }, [token]);
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
                // console.log("Post updated successfully");
                // fetchPosts();
                console.log("Post updated successfully: ", result);
                const fullName = result.data.fullName;
                const price = result.data.totalMoney;
                setFullname(fullName);
                setBalance(price);
            } else {
                // console.error("Failed to update post:", result.message);
            }
        } catch (error) {
            console.error("Error create-payment-link:", error);
        }
    };
    const handleMenuClick = (path) => {
        setActiveMenu(path);
        navigate(path);
    };
    const handleDeposit = async () => {
        try {
            debugger;
            const decoded = jwtDecode(token);
            const id = decoded?.id;
            const body = {
                userId: id,
                amountPayment: transactionAmount,
            };

            const response = await fetch(`${BASE_URL}api/v1/payment/create-payment-link`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(body),
            });

            const result = await response.json();
            if (result.message === "success") {
                const checkoutUrl = result?.data.checkoutUrl; // Lấy URL từ kết quả
                if (checkoutUrl) {
                    window.open(checkoutUrl, "_blank");
                } else {
                    console.log("checkoutUrl is missing in the response.");
                }
            } else {
                console.log("Failed to create-payment-link:", result.message);
            }
        } catch (error) {
            console.error("Error create-payment-link:", error);
        }
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
                    <button className="recharge-button" onClick={() => setIsModalOpen(true)}>
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
                <div
                    className={`menu-item ${activeMenu === "/favorite" ? "active" : ""}`}
                    onClick={() => handleMenuClick("/favorite")}
                >
                    <img src={favorite} alt="Quản lý tài khoản" className="menu-icon" />
                    <span className="menu-text">Các bài viết quan tâm</span>
                </div>
            </div>

            {/* Modal for Recharge */}
            {isModalOpen && (
                <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
                    <div className="modal-recharge" onClick={(e) => e.stopPropagation()}>
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
                            <button className="modal-form-btn" type="button" onClick={handleDeposit}>
                                Xác nhận
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Notification Modal */}
            {isNotificationOpen && (
                <div className="modal-backdrop" onClick={closeNotification}>
                    <div className="modal-notification notification-modal" onClick={(e) => e.stopPropagation()}>
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
