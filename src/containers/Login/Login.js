import React from "react";
import google from "../../assets/img/google.png";
import "./Login.css";

const Login = () => {
    return (
        <div className="login">
            <div className="login-container">
                <h1 className="heading-login">Xin chào bạn</h1>
                <p className="subheading-login">Đăng nhập để tiếp tục</p>

                <form className="login-form">
                    <div className="login-input-group">
                        <label htmlFor="email" className="login-input-label">
                            SĐT hoặc Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            className="login-input"
                            placeholder="Nhập SĐT hoặc Email"
                        />
                    </div>
                    <div className="login-input-group">
                        <label htmlFor="password" className="login-input-label">
                            Mật khẩu
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="login-input"
                            placeholder="Nhập mật khẩu"
                        />
                    </div>
                    <div className="forgot-password">
                        <a href="#" className="forgot-link">
                            Quên mật khẩu?
                        </a>
                    </div>
                    <button type="login-submit" className="btn-login">
                        Đăng nhập
                    </button>
                </form>

                <div className="login-divider">
                    <span>Hoặc</span>
                </div>

                <button className="login-btn-google">
                    <img
                        src={google}
                        alt="Google logo"
                        className="google-logo"
                    />
                    Đăng nhập với Google
                </button>

                <p className="login-terms">
                    Bằng việc tiếp tục, bạn đồng ý với{" "}
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
                    Chưa có tài khoản?{" "}
                    <a href="/register" className="login-register-link">
                        Đăng ký
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
