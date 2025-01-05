// Step1Form.js
import React from "react";
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
  return (
    <div className="post-form-container">
      {/* Progress Bar */}

      <form>
        <div className="post-form-section">
          <h3 className="post-h3">Thông tin địa chỉ</h3>

          {/* Thành phố/Tỉnh */}
          <div className="post-form-group">
            <label className="post-label">Thành phố/Tỉnh</label>
            <Select
              options={provinces}
              value={selectedProvince}
              onChange={(option) => {
                setSelectedProvince(option);
                setSelectedDistrict(null); // Reset district khi chọn lại province
                setSelectedWard(null); // Reset ward khi chọn lại province
              }}
              placeholder="Chọn Thành phố/Tỉnh"
            />
          </div>

          {/* Quận/Huyện */}
          <div className="post-form-group">
            <label className="post-label">Quận/Huyện</label>
            <Select
              options={districts}
              value={selectedDistrict}
              onChange={(option) => {
                setSelectedDistrict(option);
                setSelectedWard(null); // Reset ward khi chọn lại district
              }}
              placeholder="Chọn Quận/Huyện"
              isDisabled={!selectedProvince} // Vô hiệu hoá nếu chưa chọn tỉnh
            />
          </div>

          {/* Phường/Xã */}
          <div className="post-form-group">
            <label className="post-label">Phường/Xã</label>
            <Select
              options={wards}
              value={selectedWard}
              onChange={(option) => setSelectedWard(option)}
              placeholder="Chọn Phường/Xã"
              isDisabled={!selectedDistrict}
            />
          </div>

          {/* Địa chỉ hiện tại */}
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

          {/* Địa chỉ hiện tại */}
          <div className="post-form-group">
            <label className="post-label">Diện Tích</label>
            <input
              type="text"
              className="post-input"
              placeholder="Nhập địa chỉ chi tiết"
              onChange={(e) => handleInputChange("roomSize", e.target.value)}
            />
          </div>
          <div className="post-form-group">
            <label className="post-label">Mức giá</label>
            <input
              type="text"
              className="post-input"
              placeholder="Nhập số m vuông"
              onChange={(e) => handleInputChange("price", e.target.value)}
            />
          </div>
        </div>
        <div className="post-form-section">
          <h3 className="post-h3">Thông tin liên hệ</h3>
          {/* Địa chỉ hiện tại */}
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
              rows="4" // Số dòng chiều cao mặc định
              onChange={(e) => handleInputChange("description", e.target.value)}
              style={{ width: "100%", maxWidth: "800px" }} // Tùy chỉnh chiều rộng
            ></textarea>
          </div>
        </div>
      </form>
      <button type="button" onClick={onNext} className="post-submit-btn">
        Tiếp
      </button>
    </div>
  );
};

export default Step1Form;
