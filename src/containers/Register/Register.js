import React from "react";
import google from "../../assets/img/google.png";
import "./Register.css";

const Register = () => {
    return (
        <div className="register">
            <div className="register-container">
                <h1 className="heading-register">Xin chào bạn</h1>
                <p className="subheading-register">Đăng ký tài khoản mới</p>

                <form className="register-form">
                    <div className="register-input-group">
                        <label htmlFor="phone" className="register-input-label">
                            Số điện thoại
                        </label>
                        <input
                            type="text"
                            id="phone"
                            className="register-input"
                            placeholder="Nhập số điện thoại"
                        />
                    </div>
                    <button type="register-submit" className="btn-register">
                        Tiếp tục
                    </button>
                </form>

                <div className="register-divider">
                    <span>Hoặc</span>
                </div>

                <button className="register-btn-google">
                    <img
                        src={google}
                        alt="Google logo"
                        className="google-logo"
                    />
                    Đăng ký với Google
                </button>

                <p className="register-terms">
                    Bằng việc tiếp tục, bạn đồng ý với{" "}
                    <a href="#" className="register-terms-link">
                        Điều khoản sử dụng
                    </a>
                    ,{" "}
                    <a href="#" className="register-terms-link">
                        Chính sách bảo mật
                    </a>
                    ,{" "}
                    <a href="#" className="register-terms-link">
                        Quy chế
                    </a>
                    ,{" "}
                    <a href="#" className="register-terms-link">
                        Chính sách
                    </a>{" "}
                    của chúng tôi.
                </p>

                <p className="register-login">
                    <a href="/login" className="register-login-link">
                        Đăng nhập
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;
