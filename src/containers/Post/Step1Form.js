import React, { useState, useEffect } from "react";
import Select from "react-select";
import vietnamData from "./vietnam.json"; // Adjust the import based on your file structure

const Step1Form = ({
  selectedProvince,
  setSelectedProvince,
  selectedDistrict,
  setSelectedDistrict,
  selectedWard,
  setSelectedWard,
  onNext,
  formData,
  setFormData,
}) => {
  const [loading, setLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false); // Trạng thái kiểm tra hợp lệ form
  const [formErrors, setFormErrors] = useState({});
  const provinces = vietnamData.map((province) => ({
    value: province.code,
    label: province.name,
  }));

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  useEffect(() => {
    validateForm();
  }, [formData]);

  const handlePrediction = async () => {
    const {
      address,
      category,
      roomSize,
      price,
      email,
      phone,
      title,
      description,
    } = formData;
    setLoading(true);
    const requestData = {
      message: `Địa chỉ: ${address}, Loại mặt bằng: ${category}, Diện tích: ${roomSize}, Mức giá: ${price}, Email: ${email}, Số điện thoại: ${phone}, Tiêu đề: ${title}, Mô tả: ${description}`,
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/price-prediction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      setLoading(false);
      const data = await response.json();
      const predictionTextArea = document.getElementById(
        "pricePredictionTextarea"
      );
      predictionTextArea.value = data.response;
    } catch (error) {
      console.error("Error fetching price prediction:", error);
    }
  };
  const validateForm = () => {
    const {
      address,
      category,
      roomSize,
      price,
      email,
      phone,
      title,
      description,
    } = formData;

    const errors = {};

    if (!address || address.trim() === "")
      errors.address = "Địa chỉ không được để trống.";
    if (!category || category.trim() === "")
      errors.category = "Loại mặt bằng không được để trống.";
    if (!roomSize || roomSize.trim() === "")
      errors.roomSize = "Diện tích không được để trống.";
    if (!price || price.trim() === "")
      errors.price = "Mức giá không được để trống.";
    if (!email || email.trim() === "")
      errors.email = "Email không được để trống.";
    if (!phone || phone.trim() === "")
      errors.phone = "Số điện thoại không được để trống.";
    if (!title || title.trim() === "")
      errors.title = "Tiêu đề không được để trống.";
    if (!description || description.trim() === "")
      errors.description = "Mô tả không được để trống.";

    setFormErrors(errors);

    // Cập nhật trạng thái hợp lệ của form
    const isValid = Object.keys(errors).length === 0;
    setIsFormValid(isValid);

    return isValid; // Trả về true nếu form hợp lệ
  };

  return (
    <div className="post-form-container">
      {/* Progress Bar */}

      <form>
        <div className="post-form-section">
          <h3 className="post-h3">Thông tin địa chỉ</h3>
          <div className="post-form-group">
            <label className="post-label">Địa chỉ hiện tại</label>
            <input
              type="text"
              className="post-input"
              placeholder="Nhập địa chỉ chi tiết"
              onChange={(e) => handleInputChange("address", e.target.value)}
            />
            {formErrors.address && (
              <p className="error-text">{formErrors.address}</p>
            )}
          </div>
        </div>
        <div className="post-form-section">
          <h3 className="post-h3">Thông tin chính</h3>
          <div className="post-form-group">
            <label className="post-label">Loại mặt bằng</label>
            <select
              className="post-input"
              onChange={(e) => handleInputChange("category", e.target.value)}
              defaultValue="" // Hiển thị giá trị mặc định
            >
              <option value="" disabled>
                Chọn loại mặt bằng
              </option>
              <option value="Phòng trọ">Phòng trọ</option>
              <option value="Căn hộ">Căn hộ</option>
              <option value="Nhà nguyên căn">Nhà nguyên căn</option>
              <option value="Văn phòng">Văn phòng</option>
              <option value="Chung cư">Chung cư</option>
              <option value="Cửa hàng">Cửa hàng</option>
              <option value="Sân vận động">Sân vận động</option>
            </select>
            {formErrors.category && (
              <p className="error-text">{formErrors.category}</p>
            )}
          </div>

          <div className="post-form-group">
            <label className="post-label">Diện Tích (m²)</label>
            <input
              type="text"
              className="post-input"
              placeholder="Nhập diện tích"
              onChange={(e) => handleInputChange("roomSize", e.target.value)}
            />
            {formErrors.roomSize && (
              <p className="error-text">{formErrors.roomSize}</p>
            )}
          </div>
          <div className="post-form-group">
            <label className="post-label">Mức giá (VNĐ)</label>
            <input
              type="text"
              className="post-input"
              placeholder="Nhập mức giá"
              onChange={(e) => handleInputChange("price", e.target.value)}
            />
            {formErrors.price && (
              <p className="error-text">{formErrors.price}</p>
            )}
            <button
              type="button"
              className="post-prediction-btn"
              onClick={handlePrediction}
            >
              Dự đoán giá
            </button>
            {loading ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
              </div>
            ) : (
              <textarea
                id="pricePredictionTextarea"
                className="post-input"
                placeholder="Giá dự đoán và phân tích"
                rows="10"
                readOnly
              ></textarea>
            )}
          </div>
        </div>
        <div className="post-form-section">
          <h3 className="post-h3">Thông tin liên hệ</h3>
          <div className="post-form-group">
            <label className="post-label">Email</label>
            <input
              type="text"
              className="post-input"
              placeholder="Nhập email"
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
            {formErrors.email && (
              <p className="error-text">{formErrors.email}</p>
            )}
          </div>
          <div className="post-form-group">
            <label className="post-label">Số điện thoại</label>
            <input
              type="text"
              className="post-input"
              placeholder="Nhập số điện thoại"
              onChange={(e) => handleInputChange("phone", e.target.value)}
            />
            {formErrors.phone && (
              <p className="error-text">{formErrors.phone}</p>
            )}
          </div>
        </div>
        <div className="post-form-section">
          <h3 className="post-h3">Nội dung</h3>
          <div className="post-form-group">
            <label className="post-label">Tiêu đề</label>
            <input
              type="text"
              className="post-input"
              placeholder="Nhập tiêu đề"
              onChange={(e) => handleInputChange("title", e.target.value)}
            />
            {formErrors.title && (
              <p className="error-text">{formErrors.title}</p>
            )}
          </div>
          <div className="post-form-group">
            <label className="post-label">Mô tả</label>
            <textarea
              className="post-input"
              placeholder="Nhập thông tin mô tả"
              rows="4"
              onChange={(e) => handleInputChange("description", e.target.value)}
              style={{ width: "100%", maxWidth: "800px" }}
            ></textarea>
            {formErrors.description && (
              <p className="error-text">{formErrors.description}</p>
            )}
          </div>
        </div>
      </form>
      <button
        type="button"
        onClick={onNext}
        className="post-submit-btn"
        disabled={!isFormValid} // Disable nếu form không hợp lệ
      >
        Tiếp
      </button>
    </div>
  );
};

export default Step1Form;
