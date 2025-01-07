import React from "react";
import manage from "../../assets/icons/manage.svg";
import care from "../../assets/icons/care.svg";
import donation from "../../assets/icons/donation.svg";
import online from "../../assets/icons/online.svg";
import information from "../../assets/icons/information.svg";
import user from "../../assets/img/user.svg";
import "./Overview.css";

const Overview = () => {
    return (
        <div className="overview">
            <h1 className="overview-title">Tổng quan</h1>
            <div className="overview-summary">
                <div className="summary-item">
                    <div className="summary-item-wrapper">
                        <img src={manage} alt="Quản lý tin đăng" className="overview-icon" />
                        <h2 className="summary-item-title">Tin đăng</h2>
                    </div>
                    <p className="summary-item-news">3 tin</p>
                    <p className="summary-item-text">Đang hiển thị</p>
                    <a href="/managepost" className="summary-item-link">
                        Quản lý tin
                    </a>
                </div>
                <div className="summary-item">
                    <div className="summary-item-wrapper">
                        <img src={care} alt="Quản lý tin đăng" className="overview-icon" />
                        <h2 className="summary-item-title">Số người quan tâm</h2>
                    </div>
                    <p className="summary-item-news">2 người</p>
                    <a href="/#" className="summary-item-link">
                        + 1 mới vào hôm nay
                    </a>
                </div>
                <div className="summary-item">
                    <div className="summary-item-wrapper">
                        <img src={donation} alt="Quản lý tin đăng" className="overview-icon" />
                        <h2 className="summary-item-title">Ủng hộ nhà phát triển</h2>
                    </div>
                    <p className="summary-item-donated">Hỗ trợ nhà phát triển để thêm nhiều tính năng hữu ích hơn</p>
                    <a href="/donate" className="summary-item-link">
                        Donate
                    </a>
                </div>
            </div>
            <h2 className="section-title">Thông tin dành riêng cho bạn</h2>
            <div className="overview-details">
                {/* Interaction */}
                <div className="details-interaction">
                    <h3>🔥 Tương tác</h3>
                    <div className="details-interaction-box">
                        <div className="details-interaction-wrapper">
                            <img src={online} alt="Quản lý tin đăng" className="detail-icon" />
                            <p>Tin đăng</p>
                        </div>
                        <p className="details-interaction-care">Có 2 người quan tâm đến tin đăng của bạn</p>
                        <ul className="details-interaction-list">
                            <li className="details-interaction-item">
                                <img src={user} alt="User" className="details-interaction-icon" /> Phạm Nhật Minh đã
                                quan tâm đến tin đăng của bạn
                            </li>
                            <li className="details-interaction-item">
                                <img src={user} alt="User" className="details-interaction-icon" /> Bùi Quang Đạo đã quan
                                tâm đến tin đăng của bạn
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Notifications */}
                <div className="details-notifications">
                    <h3>🔔 Thông báo</h3>
                    <div className="details-notifications-wrapper">
                        <img src={information} alt="" className="notification-icon" />
                        <p>
                            Tin{" "}
                            <a href="#/" className="details-notifications-link">
                                #678910
                            </a>{" "}
                            sắp hết hạn
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;
