import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import google from "../../assets/img/google.png";
import bg from "../../assets/img/bg_login_2.png";
import user from "../../assets/icons/user.svg";
import lock from "../../assets/icons/lock.svg";
import eyeOpen from "../../assets/icons//eye_open.svg";
import eyeClosed from "../../assets/icons/eye_close.svg";
import "./Login.css";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/authenticate", {
        "username": email,
        "password": password,
      });

      if (response.data.status === 200) {
        const token = response.data.data;
        localStorage.setItem("token", token); 

        // Giải mã token để lấy user ID
        // Sử dụng jwtDecode đúng cách
        const decodedToken = jwtDecode(token);
        console.log("decodedToken: ",decodedToken);
        const userId = decodedToken.id;
        console.log("User ID:", userId);
        alert("Đăng nhập thành công!");
        navigate("/");
      } else {
        setError(response.data.message || "Đăng nhập thất bại.");
      }
    } catch (err) {
      setError("Đăng nhập thất bại. Vui lòng kiểm tra thông tin.");
      console.error(err);
    }
  };

  return (
    <div className="login">
      <div className="back-to-home-small">
        <button
          className="btn-back-home-small"
          onClick={() => (window.location.href = "/")}
        >
          ⬅ Trang Chủ
        </button>
      </div>

      <div className="login-left">
        <img src={bg} alt="Background" className="login-bg-image" />
      </div>

      <div className="login-container">
        <h1 className="heading-login">Xin chào bạn</h1>
        <p className="subheading-login">Đăng nhập để tiếp tục</p>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="login-input-group">
            <div className="input-wrapper">
              <img src={user} alt="User Icon" className="icon-user" />
              <input
                type="text"
                id="email"
                className="login-input"
                placeholder="SĐT hoặc Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
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
          {error && <p className="error-message">{error}</p>}
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
          Bằng việc tiếp tục, bạn đồng ý với{" "}
          <a href="#/" className="login-terms-link">
            Điều khoản sử dụng
          </a>
          ,{" "}
          <a href="#/" className="login-terms-link">
            Chính sách bảo mật
          </a>
          ,{" "}
          <a href="#/" className="login-terms-link">
            Quy chế
          </a>
          ,{" "}
          <a href="#/" className="login-terms-link">
            Chính sách
          </a>{" "}
          của chúng tôi.
        </p>

        <p className="login-register">
          Chưa là thành viên?{" "}
          <a href="/register" className="login-register-link">
            Đăng ký tại đây
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
