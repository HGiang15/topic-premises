import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import bg from "../../assets/img/bg_login_2.png";
import userIcon from "../../assets/icons/user.svg";
import "./VerifyOTP.css";

const VerifyOTP = () => {
    const [formData, setFormData] = useState({ otp: "" });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [resendDisabled, setResendDisabled] = useState(false);
    const [timer, setTimer] = useState(120); // 2 phút đếm ngược
    
    const location = useLocation(); // Nhận state từ navigate
    const navigate = useNavigate();
    const email = location.state?.email; 
    const password = location.state?.password;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // API Resend OTP register
    const handleResendOtp = async () => {
        try {
            setResendDisabled(true);
            setTimer(120); 

            const response = await fetch(
                `http://localhost:8080/verifyRegister/resendOtp/${email}`,
                { method: "POST" }
            );

            const result = await response.json();
            if (response.ok && result.status === 200) {
                alert("OTP đã được gửi lại vui lòng kiểm tra lại email của bạn!");
            } else {
                throw new Error(result.message || "Không thể gửi lại OTP vui lòng chờ 2 phút.");
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

    // API Verify OTP register
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!formData.otp) {
            setErrors({ otp: "Không được để trống." });
            return;
        }
    
        setLoading(true);
    
        try {
            const response = await fetch(
                `http://localhost:8080/verifyRegister/${formData.otp}/${email}`,
                {
                    method: "POST",
                }
            );
    
            const result = await response.json();
    
            if (response.ok && result.status === 200) {
                // OTP verify thành công -> call API login
                const loginResponse = await fetch("http://localhost:8080/authenticate", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: email, 
                        password: password, 
                    }),
                });
    
                const loginResult = await loginResponse.json();
    
                if (loginResponse.ok && loginResult.data) {
                    localStorage.setItem("token", loginResult.data);

                    setTimeout(() => {
                        setLoading(false);
                        navigate("/");
                    }, 1500);
                } else {
                    setErrors({ otp: "Đăng nhập sau xác nhận thất bại." });
                    setLoading(false);
                }
                
            } else {
                setErrors({ otp: result.message || "OTP không hợp lệ." });
                setLoading(false);
            }
        } catch (err) {
            setErrors({ otp: "Không thể kết nối với máy chủ, vui lòng thử lại." });
            setLoading(false);
        } 
    };

    return (
        <div className="verify">
            {loading && (
                <div className="verify-loading-overlay">
                    <div className="verify-spinner"></div>
                    <p>Đang tải...</p>
                </div>
            )}

            <div className="back-to-home-small">
                <button className="btn-back-home-small" onClick={() => (window.location.href = "/")}>
                    ⬅ Trang Chủ
                </button>
            </div>

            <div className="verify-left">
                <img src={bg} alt="Background" className="verify-bg-image" />
            </div>

            <div className="verify-container">
                <p className="subheading-verify">Vui lòng xác nhận OTP để đăng ký thành công</p>

                <form className="verify-form" onSubmit={handleSubmit}>
                    <div className="verify-input-group">
                        {/* OTP */}
                        <div className="input-wrapper">
                            <img src={userIcon} alt="User Icon" className="icon-user" />
                            <input
                                type="text"
                                name="otp"
                                className="verify-input"
                                placeholder="Nhập OTP"
                                value={formData.otp}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.otp && <p className="verify-error-message">{errors.otp}</p>}
                    </div>

                    <button type="submit" className="btn-verify">
                        Xác nhận
                    </button>

                    <button
                        type="button"
                        className="btn-verify btn-sendback"
                        onClick={handleResendOtp}
                        disabled={resendDisabled}
                    >
                        {resendDisabled ? `Gửi lại sau ${timer}s` : "Gửi lại OTP"}
                    </button>
                </form>

                <p className="verify-terms">
                    Bằng việc tiếp tục, bạn đồng ý với
                    <a href="#/" className="verify-terms-link"> Điều khoản sử dụng</a>,
                    <a href="#/" className="verify-terms-link"> Chính sách bảo mật</a>,
                    <a href="#/" className="verify-terms-link"> Quy chế</a>, và
                    <a href="#/" className="verify-terms-link"> Chính sách</a> của chúng tôi.
                </p>

                <p className="verify-login">
                    Đã có tài khoản?
                    <a href="/login" className="verify-login-link"> Đăng nhập tại đây</a>
                </p>
            </div>
        </div>
    );
};

export default VerifyOTP;
