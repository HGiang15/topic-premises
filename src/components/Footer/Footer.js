import React from 'react';
import logo from "../../assets/img/logo.png";
import facebook from "../../assets/icons/facebook.svg";
import instagram from "../../assets/icons/instagram.svg";
import youtube from "../../assets/icons/youtube.svg";
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* 1 */}
                <div className="footer-column">
                    <div className="footer-logo">
                        <img src={logo} alt="Logo" className="footer-logo-image" />
                        <span className="footer-logo-text">Real Estate</span>
                    </div>
                </div>

                {/* 2 */}
                <div className="footer-column">
                    <h3 className="footer-column-title">Thành viên thực hiện</h3>
                    <ul className="footer-member-list">
                        <li className="footer-member">Nguyễn Đăng Hoàng Giang</li>
                        <li className="footer-member">Bùi Quang Đạo</li>
                        <li className="footer-member">Đàm Khắc Thái</li>
                        <li className="footer-member">Phạm Nhật Minh</li>
                        <li className="footer-member">Nguyễn Ngọc Bách</li>
                    </ul>
                </div>

                {/* 3 */}
                <div className="footer-column">
                    <h3 className="footer-column-title">Liên hệ</h3>
                    <div className="footer-social-icons">
                        <a href="https://www.facebook.com/Kensiro03/" className="footer-social-icon" target="_blank" rel="noopener noreferrer">
                            <img src={facebook} alt="Facebook" />
                        </a>
                        <a href="https://www.instagram.com/hoanggiangg_15.5/" className="footer-social-icon" target="_blank" rel="noopener noreferrer">
                            <img src={instagram} alt="Instagram" />
                        </a>
                        <a href="https://www.youtube.com/@GiangHoang15-05" className="footer-social-icon" target="_blank" rel="noopener noreferrer">
                            <img src={youtube} alt="YouTube" />
                        </a>
                    </div>
                </div>

                {/* 4 */}
                <div className="footer-column">
                    <h3 className="footer-column-title">Địa chỉ</h3>
                    <p className="footer-address">Số 175, phố Tây Sơn, quận Đống Đa, thành phố Hà Nội</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
