import React, { useState } from "react";
import google from "../../assets/img/google.png";
import bg from "../../assets/img/bg_login_2.png";
import phoneIcon from "../../assets/icons/phone.svg";
import userIcon from "../../assets/icons/user.svg";
import emailIcon from "../../assets/icons/email.svg";
import passwordIcon from "../../assets/icons/lock.svg";
import "./VerifyOTP.css";

const VerifyOTP = () => {
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="register">
            {loading && (
                <div className="register-loading-overlay">
                    <div className="register-spinner"></div>
                    <p>Đang tải...</p>
                </div>
            )}

            <div className="back-to-home-small">
                <button className="btn-back-home-small" onClick={() => (window.location.href = "/")}>
                    ⬅ Trang Chủ
                </button>
            </div>

            <div className="register-left">
                <img src={bg} alt="Background" className="register-bg-image" />
            </div>

            <div className="register-container">
                <p className="subheading-register">Vui lòng xác nhận OTP</p>

                <form className="register-form">
                    <div className="register-input-group">
                        {/* Fullname */}
                        <div className="input-wrapper">
                            <img src={userIcon} alt="User Icon" className="icon-user" />
                            <input
                                type="text"
                                name="fullname"
                                className="register-input"
                                placeholder="Nhập tên đầy đủ của bạn"
                                value={formData.fullname}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.fullname && <p className="error-message">{errors.fullname}</p>}
                    </div>

                    <button type="submit" className="btn-register">
                        Xác nhận
                    </button>
                </form>

                <p className="register-terms">
                    Bằng việc tiếp tục, bạn đồng ý với
                    <a href="#/" className="register-terms-link">
                        {" "}
                        Điều khoản sử dụng
                    </a>
                    ,
                    <a href="#/" className="register-terms-link">
                        {" "}
                        Chính sách bảo mật
                    </a>
                    ,
                    <a href="#/" className="register-terms-link">
                        {" "}
                        Quy chế
                    </a>
                    , và
                    <a href="#/" className="register-terms-link">
                        {" "}
                        Chính sách
                    </a>{" "}
                    của chúng tôi.
                </p>

                <p className="register-login">
                    Đã có tài khoản?
                    <a href="/login" className="register-login-link">
                        {" "}
                        Đăng nhập tại đây
                    </a>
                </p>
            </div>
        </div>
    );
};

export default VerifyOTP;