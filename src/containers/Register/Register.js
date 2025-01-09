import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import bg from "../../assets/img/bg_login_2.png";
import phoneIcon from "../../assets/icons/phone.svg";
import userIcon from "../../assets/icons/user.svg";
import emailIcon from "../../assets/icons/email.svg";
import passwordIcon from "../../assets/icons/lock.svg";
import eyeOpen from "../../assets/icons//eye_open.svg";
import eyeClosed from "../../assets/icons/eye_close.svg";
import "./Register.css";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const validateFullName = (name) => /^[^\d]+$/.test(name);
    const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const validatePhone = (phone) => /^[0-9]{10,15}$/.test(phone);
    const validatePassword = (password) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/.test(password);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullname) {
            newErrors.fullname = "Không được để trống.";
        } else if (!validateFullName(formData.fullname)) {
            newErrors.fullname = "Tên không được chứa số.";
        }

        if (!formData.email) {
            newErrors.email = "Không được để trống.";
        } else if (!validateEmail(formData.email)) {
            newErrors.email = "Email không hợp lệ.";
        }

        if (!formData.phone) {
            newErrors.phone = "Không được để trống.";
        } else if (!validatePhone(formData.phone)) {
            newErrors.phone = "Số điện thoại chỉ được chứa số và phải có từ 10 đến 15 chữ số.";
        }

        if (!formData.password) {
            newErrors.password = "Không được để trống.";

        } else if (!validatePassword(formData.password)) {
            newErrors.password =
                "Mật khẩu phải có ít nhất 10 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Không được để trống.";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Mật khẩu và xác nhận mật khẩu không khớp.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {
            const response = await fetch("http://localhost:8080/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullName: formData.fullname,
                    email: formData.email,
                    phone: formData.phone,
                    password: formData.password,
                    image: null,
                }),
            });

            const result = await response.json();

            if (response.ok && result.status === 200) {
                setTimeout(() => {
                    setLoading(false);
                    navigate("/verifyotp", {
                        state: { email: formData.email, password: formData.password },
                    });
                }, 1000);
            } else {
                // Kiểm tra thông báo lỗi "Email or phone existed"
                if (result.data === "Email or phone existed") {
                    setErrors({
                        general: "Email hoặc số điện thoại đã tồn tại. Vui lòng sử dụng email hoặc số điện thoại khác.",
                    });
                } else {
                    setErrors({ general: result.message || "Đăng ký thất bại, vui lòng thử lại." });
                }
                setLoading(false);
            }
        } catch (err) {
            setErrors({ general: "Không thể kết nối với máy chủ, vui lòng thử lại." });
            setLoading(false);
        }
    };

    return (
        <div className="register">
            {loading && (
                <div className="register-loading-overlay">
                    <div className="register-spinner"></div>
                    <p>Đang tải...</p>
                </div>
            )}

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
                                name="fullname"
                                className="register-input"
                                placeholder="Nhập tên đầy đủ của bạn"
                                value={formData.fullname}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.fullname && <p className="error-message">{errors.fullname}</p>}

                        {/* Email */}
                        <div className="input-wrapper">
                            <img src={emailIcon} alt="Email Icon" className="icon-user" />
                            <input
                                type="text"
                                name="email"
                                className="register-input"
                                placeholder="Nhập email của bạn"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.email && <p className="error-message">{errors.email}</p>}

                        {/* Phone */}
                        <div className="input-wrapper">
                            <img src={phoneIcon} alt="Phone Icon" className="icon-user" />
                            <input
                                type="text"
                                name="phone"
                                className="register-input"
                                placeholder="Nhập số điện thoại của bạn"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.phone && <p className="error-message">{errors.phone}</p>}

                        {/* Password */}
                        <div className="input-wrapper">
                            <img src={passwordIcon} alt="Password Icon" className="icon-user" />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                className="register-input"
                                placeholder="Nhập mật khẩu"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <img
                                src={showPassword ? eyeOpen : eyeClosed}
                                alt="Toggle Password Visibility"
                                className="icon-eye"
                                onClick={togglePasswordVisibility}
                            />
                        </div>
                        {errors.password && <p className="error-message">{errors.password}</p>}

                        {/* Confirm Password */}
                        <div className="input-wrapper">
                            <img src={passwordIcon} alt="Confirm Password Icon" className="icon-user" />
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                className="register-input"
                                placeholder="Xác nhận mật khẩu"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            <img
                                src={showConfirmPassword ? eyeOpen : eyeClosed}
                                alt="Toggle Confirm Password Visibility"
                                className="icon-eye"
                                onClick={toggleConfirmPasswordVisibility}
                            />
                        </div>
                        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
                    </div>

                    {errors.general && <p className="error-message error-message-general">{errors.general}</p>}

                    <button type="submit" className="btn-register">
                        Đăng ký
                    </button>
                </form>

                <p className="register-terms">
                    Bằng việc tiếp tục, bạn đồng ý với
                    <a href="#/" className="register-terms-link">
                        {" "}
                        Điều khoản sử dụng
                    </a>
                    ,
                    <a href="#/" className="register-terms-link">
                        {" "}
                        Chính sách bảo mật
                    </a>
                    ,
                    <a href="#/" className="register-terms-link">
                        {" "}
                        Quy chế
                    </a>
                    , và
                    <a href="#/" className="register-terms-link">
                        {" "}
                        Chính sách
                    </a>{" "}
                    của chúng tôi.
                </p>

                <p className="register-login">
                    Đã có tài khoản?
                    <a href="/login" className="register-login-link">
                        {" "}
                        Đăng nhập tại đây
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;
