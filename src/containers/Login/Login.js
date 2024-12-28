import React, { useState } from "react";
import google from "../../assets/img/google.png";
import bg from "../../assets/img/bg_login_2.png";
import user from "../../assets/icons/user.svg";
import lock from "../../assets/icons/lock.svg";
import eyeOpen from "../../assets/icons//eye_open.svg";
import eyeClosed from "../../assets/icons/eye_close.svg";
import "./Login.css";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login">
            <div className="login-left">
                <img src={bg} alt="Background" className="login-bg-image" />
            </div>

            <div className="login-container">
                <h1 className="heading-login">Xin chào bạn</h1>
                <p className="subheading-login">Đăng nhập để tiếp tục</p>

                <form className="login-form">
                    <div className="login-input-group">
                        <div className="input-wrapper">
                            <img src={user} alt="User Icon" className="icon-user" />
                            <input type="text" id="email" className="login-input" placeholder="SĐT hoặc Email" />
                        </div>
                    </div>
                    <div className="login-input-group">
                        <div className="input-wrapper">
                            <img src={lock} alt="Lock Icon" className="icon-lock" />
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                className="login-input"
                                placeholder="Nhập mật khẩu"
                            />
                            <img
                                src={showPassword ? eyeOpen : eyeClosed}
                                alt={showPassword ? "Hide Password" : "Show Password"}
                                className="icon-eye"
                                onClick={togglePasswordVisibility}
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn-login">
                        Đăng nhập
                    </button>
                    <div className="forgot-password">
                        <a href="/forgotpassword" className="forgot-link">
                            Quên mật khẩu?
                        </a>
                    </div>
                </form>

                <div className="login-divider">
                    <div className="divider-line"></div>
                    <span className="divider-text">Hoặc</span>
                    <div className="divider-line"></div>
                </div>

                <button className="login-btn-google">
                    <img src={google} alt="Google logo" className="google-logo" />
                    Đăng nhập với Google
                </button>

                <p className="login-terms">
                    Bằng việc tiếp tục, bạn đồng ý với {" "}
                    <a href="#" className="login-terms-link">
                        Điều khoản sử dụng
                    </a>
                    ,{" "}
                    <a href="#" className="login-terms-link">
                        Chính sách bảo mật
                    </a>
                    ,{" "}
                    <a href="#" className="login-terms-link">
                        Quy chế
                    </a>
                    ,{" "}
                    <a href="#" className="login-terms-link">
                        Chính sách
                    </a>{" "}
                    của chúng tôi.
                </p>

                <p className="login-register">
                    Chưa là thành viên? {" "}
                    <a href="/register" className="login-register-link">
                        Đăng ký tại đây
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
