import React, { useState } from "react";
import bg from "../../assets/img/bg_login_2.png";
import phone from "../../assets/icons/phone.svg";
import backIcon from "../../assets/icons/back.svg";
import "./ForgotPassword.css";

const ForgotPassword = () => {
    const [emailOrPhone, setEmailOrPhone] = useState("");

    const handleInputChange = (e) => {
        setEmailOrPhone(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý gửi yêu cầu quên mật khẩu ở đây
        console.log(emailOrPhone);
    };

    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <div className="forgot-pass">
            <div className="back-to-home-small">
                <button className="btn-back-home-small" onClick={() => (window.location.href = "/")}>
                    ⬅ Trang Chủ
                </button>
            </div>

            <div className="forgot-pass-left">
                <img src={bg} alt="Background" className="forgot-pass-bg-image" />
            </div>

            <div className="forgot-pass-container">
                <div className="back-button" onClick={handleGoBack}>
                    <img src={backIcon} alt="Back Icon" className="back-icon" />
                </div>
                <h1 className="heading-forgot-pass">Khôi phục mật khẩu</h1>

                <form className="forgot-pass-form" onSubmit={handleSubmit}>
                    <div className="forgot-pass-input-group">
                        <div className="input-wrapper">
                            <img src={phone} alt="User Icon" className="icon-user" />
                            <input
                                type="text"
                                id="emailOrPhone"
                                className="forgot-pass-input"
                                placeholder="SĐT hoặc Email"
                                value={emailOrPhone}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn-forgot-pass">
                        Gửi yêu cầu
                    </button>
                </form>

                <p className="forgot-pass-login">
                    Đã nhớ mật khẩu?{" "}
                    <a href="/login" className="forgot-pass-login-link">
                        Đăng nhập tại đây
                    </a>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
