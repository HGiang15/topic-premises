import React, { useState, useRef } from "react";
import user from "../../assets/img/user.svg";
import "./ManageInfo.css";

const ManageInfo = () => {
    const [profileImage, setProfileImage] = useState(user);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const fileInputRef = useRef(null);

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
    const validatePasswords = () => {
        const newErrors = {};
    
        if (!currentPassword) {
            newErrors.currentPassword = "Mật khẩu hiện tại không được để trống.";
        }
        if (!newPassword) {
            newErrors.newPassword = "Mật khẩu mới không được để trống.";
        } else {
            if (newPassword.length < 8) {
                newErrors.newPassword = "Mật khẩu mới phải có tối thiểu 8 ký tự.";
            }
            if (!/[A-Z]/.test(newPassword)) {
                newErrors.newPassword = "Mật khẩu mới phải chứa ít nhất 1 ký tự viết hoa.";
            }
            if (!/[0-9]/.test(newPassword)) {
                newErrors.newPassword = "Mật khẩu mới phải chứa ít nhất 1 ký tự số.";
            }
            if (!/[^A-Za-z0-9]/.test(newPassword)) {  
                newErrors.newPassword = "Mật khẩu mới phải chứa ít nhất 1 ký tự đặc biệt.";
            }
        }
    
        if (newPassword && confirmPassword !== newPassword) {
            newErrors.confirmPassword = "Mật khẩu xác nhận không khớp.";
        }
    
        setErrors(newErrors);
    
        return Object.keys(newErrors).length === 0;
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validatePasswords()) {
            // Xử lý lưu thay đổi (gọi API)
            console.log("Mật khẩu đã thay đổi thành công!");
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

                <form className="manage-info-form" onSubmit={handleSubmit}>
                    <div className="manage-info-form-group">
                        <label className="manage-info-label">Họ tên</label>
                        <input className="manage-info-input" type="text" placeholder="Nguyễn Đăng Hoàng Giang" />
                    </div>

                    <div className="manage-info-form-group">
                        <label className="manage-info-label">Email</label>
                        <input className="manage-info-input" type="email" placeholder="gianghoang123@gmail.com" />
                    </div>

                    <div className="manage-info-form-group">
                        <label className="manage-info-label">Số điện thoại</label>
                        <input className="manage-info-input" type="text" placeholder="0123456789" />
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

                    <button className="manage-info-save-btn" type="submit">Lưu thay đổi</button>
                </form>
            </div>
        </div>
    );
};

export default ManageInfo;
