import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import bg from "../../assets/img/bg_login_2.png";
import userIcon from "../../assets/icons/user.svg";
import "./VerifyOTPForgot.css";

const VerifyOTPForgot = () => {
    const [formData, setFormData] = useState({ otp: "" });
    const [resendDisabled, setResendDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [timer, setTimer] = useState(120); // 2 phút đếm ngược
    
    const location = useLocation(); 
    const navigate = useNavigate();
    const email = location.state?.email; 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // API Resend OTP Forgot
    const handleResendOtp = async () => {
        try {
            setResendDisabled(true);
            setTimer(120); // Reset timer về 2 phút

            const response = await fetch(
                `http://localhost:8080/verifyRegister/resendOtp/${email}`,
                { method: "POST" }
            );

            const result = await response.json();
            if (response.ok && result.status === 200) {
                alert("OTP đã được gửi lại vui lòng kiểm tra lại email của bạn!");
            } else {
                throw new Error(result.message || "Không thể gửi lại OTP.");
            }
        } catch (err) {
            alert(err.message);
        }
    };

    useEffect(() => {
        let countdown;
        if (resendDisabled) {
            countdown = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        clearInterval(countdown);
                        setResendDisabled(false); // Kích hoạt lại nút "Gửi lại OTP"
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(countdown);
    }, [resendDisabled]);

    // API verify OTP Forgot
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);

        if (!formData.otp || formData.otp.length !== 6) {
            setErrors({ otp: "OTP phải có 6 ký tự." });
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:8080/api/v1/forgotPassword/verifyOtp/${formData.otp}/${email}`,
                { method: "POST" }
            );

            const result = await response.json();
            if (response.ok && result.status === 200) {
                setTimeout(() => {
                    setLoading(false);
                    navigate("/changepass", { state: { email } });
                }, 1000);
            } else {
                throw new Error(result.message || "OTP không hợp lệ.");
            }
        } catch (err) {
            setErrors({ otp: err.message });
            setLoading(false);
        }
    };

    return (
        <div className="verify-forgot">
            {loading && (
                <div className="verify-forgot-loading-overlay">
                    <div className="verify-forgot-spinner"></div>
                    <p>Đang tải...</p>
                </div>
            )}

            <div className="back-to-home-small">
                <button className="btn-back-home-small" onClick={() => (window.location.href = "/")}>
                    ⬅ Trang Chủ
                </button>
            </div>

            <div className="verify-forgot-left">
                <img src={bg} alt="Background" className="verify-forgot-bg-image" />
            </div>

            <div className="verify-forgot-container">
                <p className="subheading-verify-forgot">Vui lòng xác nhận OTP để thay đổi mật khẩu</p>

                <form className="verify-forgot-form" onSubmit={handleSubmit}>
                    <div className="verify-forgot-input-group">
                        {/* OTP */}
                        <div className="input-wrapper">
                            <img src={userIcon} alt="User Icon" className="icon-user" />
                            <input
                                type="text"
                                name="otp"
                                className="verify-forgot-input"
                                placeholder="Nhập OTP"
                                value={formData.otp}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.otp && <p className="verify-forgot-error-message">{errors.otp}</p>}
                    </div>

                    <button type="submit" className="btn-verify-forgot">
                        Xác nhận
                    </button>
                </form>

                <button
                    className="btn-verify btn-resend-otp"
                    onClick={handleResendOtp}
                    disabled={resendDisabled}
                >
                    {resendDisabled ? `Gửi lại sau ${timer}s` : "Gửi lại OTP"}
                </button>

                <p className="verify-forgot-terms">
                    Bằng việc tiếp tục, bạn đồng ý với
                    <a href="#/" className="verify-forgot-terms-link"> Điều khoản sử dụng</a>,
                    <a href="#/" className="verify-forgot-terms-link"> Chính sách bảo mật</a>,
                    <a href="#/" className="verify-forgot-terms-link"> Quy chế</a>, và
                    <a href="#/" className="verify-forgot-terms-link"> Chính sách</a> của chúng tôi.
                </p>

                <p className="verify-forgot-login">
                    Đã có tài khoản?
                    <a href="/login" className="verify-forgot-login-link"> Đăng nhập tại đây</a>
                </p>
            </div>
        </div>
    );
};

export default VerifyOTPForgot;
