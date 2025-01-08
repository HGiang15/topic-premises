import React, { useState } from "react";
import google from "../../assets/img/google.png";
import bg from "../../assets/img/bg_login_2.png";
import phoneIcon from "../../assets/icons/phone.svg";
import userIcon from "../../assets/icons/user.svg";
import emailIcon from "../../assets/icons/care.svg";
import passwordIcon from "../../assets/icons/lock.svg";
import "./Register.css";

const Register = () => {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleFullnameChange = (e) => {
        setFullname(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullName: fullname,
                    email: email,
                    phone: phone,
                    password: password,
                    image: null,
                }),
            });

            const result = await response.json();

            if (response.ok && result.status === 200) {
                window.location.href = "/";
            } else {
                // Xử lý lỗi
                setError(result.message || "Đăng ký thất bại, vui lòng thử lại.");
            }
        } catch (err) {
            setError("Không thể kết nối với máy chủ, vui lòng thử lại.");
        }
    };

    return (
        <div className="register">
            <div className="back-to-home-small">
                <button className="btn-back-home-small" onClick={() => (window.location.href = "/")}>
                    ⬅ Trang Chủ
                </button>
            </div>

            <div className="register-left">
                <img src={bg} alt="Background" className="register-bg-image" />
            </div>

            <div className="register-container">
                <h1 className="heading-register">Xin chào bạn</h1>
                <p className="subheading-register">Đăng ký để tiếp tục</p>

                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="register-input-group">
                        {/* Fullname */}
                        <div className="input-wrapper">
                            <img src={userIcon} alt="User Icon" className="icon-user" />
                            <input
                                type="text"
                                id="fullname"
                                className="register-input"
                                placeholder="Nhập tên đầy đủ của bạn"
                                value={fullname}
                                onChange={handleFullnameChange}
                            />
                        </div>

                        {/* Email */}
                        <div className="input-wrapper">
                            <img src={emailIcon} alt="User Icon" className="icon-user" />
                            <input
                                type="text"
                                id="email"
                                className="register-input"
                                placeholder="Nhập email đầy đủ"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>

                        {/* Phone */}
                        <div className="input-wrapper">
                            <img src={phoneIcon} alt="User Icon" className="icon-user" />
                            <input
                                type="text"
                                id="phone"
                                className="register-input"
                                placeholder="Nhập số điện thoại đầy đủ"
                                value={phone}
                                onChange={handlePhoneChange}
                            />
                        </div>

                        {/* Password */}
                        <div className="input-wrapper">
                            <img src={passwordIcon} alt="User Icon" className="icon-user" />
                            <input
                                type="password"
                                id="password"
                                className="register-input"
                                placeholder="Nhập mật khẩu"
                                value={password}
                                onChange={handlePasswordChange}
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
                    Bằng việc tiếp tục, bạn đồng ý với{" "}
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
