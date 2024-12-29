import React, { useState } from "react";
import google from "../../assets/img/google.png"; 
import bg from "../../assets/img/bg_login_2.png"; 
import phone from "../../assets/icons/phone.svg";
import "./Register.css";

const Register = () => {
    const [emailOrPhone, setEmailOrPhone] = useState("");

    const handleInputChange = (e) => {
        setEmailOrPhone(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý gửi yêu cầu đăng ký ở đây
        console.log(emailOrPhone);
    };

    return (
        <div className="register">
            <div className="register-left">
                <img src={bg} alt="Background" className="register-bg-image" />
            </div>

            <div className="register-container">
                <h1 className="heading-register">Xin chào bạn</h1>
                <p className="subheading-register">Đăng ký để tiếp tục</p>

                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="register-input-group">
                        <div className="input-wrapper">
                            <img src={phone} alt="User Icon" className="icon-user" />
                            <input
                                type="text"
                                id="emailOrPhone"
                                className="register-input"
                                placeholder="SĐT hoặc Email"
                                value={emailOrPhone}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn-register">
                        Đăng ký
                    </button>
                </form>

                <div className="register-divider">
                    <div className="divider-line"></div>
                    <span className="divider-text">Hoặc</span>
                    <div className="divider-line"></div>
                </div>

                <button className="register-btn-google">
                    <img src={google} alt="Google logo" className="google-logo" />
                    Đăng ký với Google
                </button>

                <p className="register-terms">
                    Bằng việc tiếp tục, bạn đồng ý với {" "}
                    <a href="#/" className="register-terms-link">
                        Điều khoản sử dụng
                    </a>
                    ,{" "}
                    <a href="#/" className="register-terms-link">
                        Chính sách bảo mật
                    </a>
                    ,{" "}
                    <a href="#/" className="register-terms-link">
                        Quy chế
                    </a>
                    ,{" "}
                    <a href="#/" className="register-terms-link">
                        Chính sách
                    </a>{" "}
                    của chúng tôi.
                </p>

                <p className="register-login">
                    Đã có tài khoản?{" "}
                    <a href="/login" className="register-login-link">
                        Đăng nhập tại đây
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;
