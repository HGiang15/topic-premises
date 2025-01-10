import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../../assets/img/bg_login_2.png";
import phone from "../../assets/icons/email.svg";
import backIcon from "../../assets/icons/back.svg";
import "./ForgotPassword.css";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        setEmail(e.target.value);
    };

    const handleGoBack = () => {
        window.history.back();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); 
        setLoading(true); 

        try {
            const response = await fetch(`http://localhost:8080/api/v1/forgotPassword/verifyMail/${email}`, {
                method: "POST",
            });
            const result = await response.json();

            if (response.ok && result.status === 200) {
                setTimeout(() => {
                    setLoading(false);
                    navigate("/verifyotpforgot", { state: { email } });
                }, 500);
            } else {
                throw new Error(result.message || "Gửi yêu cầu OTP thất bại.");
            }
        } catch (err) {
            setError(err.message || "Không thể kết nối với máy chủ.");
            setLoading(false); 
        } 
    };

    return (
        <div className="forgot-pass">
            {loading && (
                <div className="forgot-pass-loading-overlay">
                    <div className="forgot-pass-spinner"></div>
                </div>
            )}
        
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
                                id="email"
                                className="forgot-pass-input"
                                placeholder="Nhập Email"
                                value={email}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn-forgot-pass">
                        Gửi yêu cầu
                    </button>
                </form>

                {error && <p className="forgot-error-message">{error}</p>}

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
