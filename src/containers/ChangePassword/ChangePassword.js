import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import bg from "../../assets/img/bg_login_2.png";
import lock from "../../assets/icons/lock.svg";
import eyeOpen from "../../assets/icons/eye_open.svg";
import eyeClosed from "../../assets/icons/eye_close.svg";
import "./ChangePassword.css";

const ChangePassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email;

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (!password || password.length < 8) {
            setError("Mật khẩu phải ít nhất 8 ký tự.");
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError("Mật khẩu xác nhận không khớp.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/v1/forgotPassword/changePassword/${email}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: email, password, repeatPassword: password }),
            });
            const result = await response.json();

            if (response.ok && result.status === 200) {
                setTimeout(() => {
                    setLoading(false);
                    setSuccess(true); // Khi đổi mật khẩu thành công, hiển thị popup
                }, 1000);
            } else {
                throw new Error(result.message || "Đổi mật khẩu thất bại.");
            }
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    // Hàm để đóng popup và điều hướng đến trang login
    const handleClosePopup = () => {
        setSuccess(false);
        navigate("/login");
    };

    return (
        <div className="change-pass">
            {loading && (
                <div className="change-pass-loading-overlay">
                    <div className="change-pass-spinner"></div>
                    <p>Đang xử lý...</p>
                </div>
            )}
            <div className="back-to-home-small">
                <button className="btn-back-home-small" onClick={() => (window.location.href = "/")}>
                    ⬅ Trang Chủ
                </button>
            </div>

            <div className="change-pass-left">
                <img src={bg} alt="Background" className="change-pass-bg-image" />
            </div>

            <div className="change-pass-container">
                <p className="subheading-change-pass">Vui lòng nhập mật khẩu mới</p>

                <form className="change-pass-form" onSubmit={handleSubmit}>
                    {/* Mật khẩu mới */}
                    <div className="change-pass-input-group">
                        <div className="input-wrapper">
                            <img src={lock} alt="Lock Icon" className="icon-lock" />
                            <input
                                type={showPassword ? "text" : "password"}
                                className="change-pass-input"
                                placeholder="Nhập mật khẩu mới"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <img
                                src={showPassword ? eyeOpen : eyeClosed}
                                alt={showPassword ? "Hide Password" : "Show Password"}
                                className="icon-eye"
                                onClick={togglePasswordVisibility}
                            />
                        </div>
                    </div>

                    {/* Xác nhận mật khẩu */}
                    <div className="change-pass-input-group">
                        <div className="input-wrapper">
                            <img src={lock} alt="Lock Icon" className="icon-lock" />
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                className="change-pass-input"
                                placeholder="Xác nhận mật khẩu"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <img
                                src={showConfirmPassword ? eyeOpen : eyeClosed}
                                alt={showConfirmPassword ? "Hide Password" : "Show Password"}
                                className="icon-eye"
                                onClick={toggleConfirmPasswordVisibility}
                            />
                        </div>
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <button type="submit" className="btn-change-pass">
                        Xác nhận
                    </button>
                </form>

                <p className="change-pass-terms">
                    Bằng việc tiếp tục, bạn đồng ý với{" "}
                    <a href="#/" className="change-pass-terms-link">
                        Điều khoản sử dụng
                    </a>
                    ,{" "}
                    <a href="#/" className="change-pass-terms-link">
                        Chính sách bảo mật
                    </a>
                    ,{" "}
                    <a href="#/" className="change-pass-terms-link">
                        Quy chế
                    </a>
                    ,{" "}
                    <a href="#/" className="change-pass-terms-link">
                        Chính sách
                    </a>{" "}
                    của chúng tôi.
                </p>

                <p className="change-pass-register">
                    Đã có tài khoản?{" "}
                    <a href="/login" className="change-pass-register-link">
                        Đăng nhập tại đây
                    </a>
                </p>
            </div>

            {/* Popup thông báo khi đổi mật khẩu thành công */}
            {success && (
                <div className="popup-change-success">
                    <div className="popup-change-content">
                        <h3 className="popup-change-heading">Đổi mật khẩu thành công!</h3>
                        <button className="btn-close-change-popup" onClick={handleClosePopup}>
                            Đóng
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ChangePassword;
