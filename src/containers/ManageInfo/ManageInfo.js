import React, { useState, useRef, useEffect } from "react";
import user from "../../assets/img/user.svg";
import "./ManageInfo.css";
import BASE_URL from "../../config";

import { jwtDecode } from "jwt-decode";
const ManageInfo = () => {
  const [profileImage, setProfileImage] = useState(user);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);
  // Lấy thông tin người dùng từ API
  const handleUserInfo = async () => {
    try {
      setIsLoading(true); // Bắt đầu trạng thái đang tải
      const decoded = jwtDecode(token);
      const id = decoded?.id;
      const response = await fetch(`${BASE_URL}api/v1/userInfor/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (response.ok) {
        // Cập nhật thông tin người dùng vào state
        setFullname(result.data.fullName || "");
        setEmail(result.data.email || "");
        setPhone(result.data.phone || "");
      } else {
        console.error("Failed to fetch user info:", result.message);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    } finally {
      setIsLoading(false); // Đặt trạng thái isLoading về false
    }
  };

  // Lấy thông tin người dùng khi component được mount
  useEffect(() => {
    handleUserInfo();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Validate Password Change
  //   const validatePasswords = () => {
  //     const newErrors = {};

  //     if (!currentPassword) {
  //       newErrors.currentPassword = "Mật khẩu hiện tại không được để trống.";
  //     }
  //     if (!newPassword) {
  //       newErrors.newPassword = "Mật khẩu mới không được để trống.";
  //     } else {
  //       if (newPassword.length < 8) {
  //         newErrors.newPassword = "Mật khẩu mới phải có tối thiểu 8 ký tự.";
  //       }
  //       if (!/[A-Z]/.test(newPassword)) {
  //         newErrors.newPassword =
  //           "Mật khẩu mới phải chứa ít nhất 1 ký tự viết hoa.";
  //       }
  //       if (!/[0-9]/.test(newPassword)) {
  //         newErrors.newPassword = "Mật khẩu mới phải chứa ít nhất 1 ký tự số.";
  //       }
  //       if (!/[^A-Za-z0-9]/.test(newPassword)) {
  //         newErrors.newPassword =
  //           "Mật khẩu mới phải chứa ít nhất 1 ký tự đặc biệt.";
  //       }
  //     }

  //     if (newPassword && confirmPassword !== newPassword) {
  //       newErrors.confirmPassword = "Mật khẩu xác nhận không khớp.";
  //     }

  //     setErrors(newErrors);

  //     return Object.keys(newErrors).length === 0;
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const id = jwtDecode(token)?.id;
  
    // Kiểm tra xác thực trước khi gọi API
    if (!id) {
      alert("Không thể xác định người dùng.");
      return;
    }
  
    if (newPassword !== confirmPassword) {
      setErrors({ confirmPassword: "Mật khẩu xác nhận không khớp." });
      return;
    }
  
    try {
      setIsLoading(true);
      const payload = {
        email,
        fullName: fullname,
        phone,
        currentPassword,
        newPassword,
        confirmPassword,
      };
  
      const response = await fetch(`${BASE_URL}api/v1/userInfor/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
  
      const result = await response.json();
      if (response.ok) {
        alert("Cập nhật thông tin thành công!");
        handleUserInfo(); // Tải lại thông tin sau khi cập nhật
      } else {
        console.error("Cập nhật thất bại:", result.message);
        alert(`Lỗi: ${result.message}`);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      alert("Đã xảy ra lỗi khi gọi API.");
    } finally {
      // Đảm bảo luôn đặt isLoading về false
      setIsLoading(false);
      window.location.reload();
    }
    
  };
  
  return (
    <div className="manage-info">
      <div className="manage-info-container">
        <h1 className="manage-info-heading">Chỉnh sửa thông tin</h1>

        <div className="profile-section">
          <div className="profile-picture">
            <img src={profileImage} alt="Avatar" className="manage-info-img" />

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>
        </div>
        {isLoading ? (
          <div className="product-loading-spinner">
            <div className="product-spinner"></div>
            <p>Đang tải...</p>
          </div>
        ) : (
          <form className="manage-info-form" onSubmit={handleSubmit}>
            <div className="manage-info-form-group">
              <label className="manage-info-label">Họ tên</label>
              <input
                className="manage-info-input"
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>

            <div className="manage-info-form-group">
              <label className="manage-info-label">Email</label>
              <input
                className="manage-info-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="manage-info-form-group">
              <label className="manage-info-label">Số điện thoại</label>
              <input
                className="manage-info-input"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* Password Change */}
            <div className="manage-info-form-group">
              <label className="manage-info-label">Mật khẩu hiện tại</label>
              <input
                className="manage-info-input"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              {errors.currentPassword && (
                <p className="error-message">{errors.currentPassword}</p>
              )}
            </div>

            <div className="manage-info-form-group">
              <label className="manage-info-label">Mật khẩu mới</label>
              <input
                className="manage-info-input"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              {errors.newPassword && (
                <p className="error-message">{errors.newPassword}</p>
              )}
            </div>

            <div className="manage-info-form-group">
              <label className="manage-info-label">Xác nhận mật khẩu mới</label>
              <input
                className="manage-info-input"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors.confirmPassword && (
                <p className="error-message">{errors.confirmPassword}</p>
              )}
            </div>

            <button className="manage-info-save-btn" type="submit">
              Lưu thay đổi
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ManageInfo;
