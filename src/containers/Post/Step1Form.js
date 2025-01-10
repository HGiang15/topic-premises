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

  const provinces = vietnamData.map((province) => ({
    value: province.code,
    label: province.name,
  }));

  const districts =
    selectedProvince &&
    vietnamData
      .find((province) => province.code === selectedProvince.value)
      .districts.map((district) => ({
        value: district.code,
        label: district.name,
      }));

  const wards =
    selectedDistrict &&
    vietnamData
      .find((province) => province.code === selectedProvince.value)
      .districts.find((district) => district.code === selectedDistrict.value)
      .wards.map((ward) => ({
        value: ward.code,
        label: ward.name,
      }));

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Hàm kiểm tra tính hợp lệ của form
  const validateForm = () => {
    const { address, category, roomSize, price, email, phone, title, description } = formData;
    const requiredFields = [address, category, roomSize, price, email, phone, title, description];
    const allFieldsFilled = requiredFields.every((field) => field && field.trim() !== "");
    setIsFormValid(allFieldsFilled); // Cập nhật trạng thái hợp lệ
  };

  // Gọi validateForm mỗi khi formData thay đổi
  useEffect(() => {
    validateForm();
  }, [formData]);

  const handlePrediction = async () => {
    const { address, category, roomSize, price, email, phone, title, description } = formData;
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
      const predictionTextArea = document.getElementById("pricePredictionTextarea");
      predictionTextArea.value = data.response;
    } catch (error) {
      console.error("Error fetching price prediction:", error);
    }
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
          </div>
        </div>
        <div className="post-form-section">
          <h3 className="post-h3">Thông tin chính</h3>
          <div className="post-form-group">
            <label className="post-label">Loại mặt bằng</label>
            <input
              type="text"
              className="post-input"
              placeholder="Nhập loại mặt bằng"
              onChange={(e) => handleInputChange("category", e.target.value)}
            />
          </div>
          <div className="post-form-group">
            <label className="post-label">Diện Tích (m²)</label>
            <input
              type="text"
              className="post-input"
              placeholder="Nhập diện tích"
              onChange={(e) => handleInputChange("roomSize", e.target.value)}
            />
          </div>
          <div className="post-form-group">
            <label className="post-label">Mức giá (VNĐ)</label>
            <input
              type="text"
              className="post-input"
              placeholder="Nhập mức giá"
              onChange={(e) => handleInputChange("price", e.target.value)}
            />
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
          </div>
          <div className="post-form-group">
            <label className="post-label">Số điện thoại</label>
            <input
              type="text"
              className="post-input"
              placeholder="Nhập số điện thoại"
              onChange={(e) => handleInputChange("phone", e.target.value)}
            />
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
