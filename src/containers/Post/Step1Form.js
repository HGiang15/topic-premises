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
            isDisabled={!selectedDistrict} // Vô hiệu hoá nếu chưa chọn huyện
          />
        </div>

        {/* Đường/Phố */}
        <div className="post-form-group">
          <label className="post-label">Đường/Phố</label>
          <input
            type="text"
            className="post-input"
            placeholder="Nhập tên đường/phố"
          />
        </div>

        {/* Địa chỉ hiện tại */}
        <div className="post-form-group">
          <label className="post-label">Địa chỉ hiện tại</label>
          <input
            type="text"
            className="post-input"
            placeholder="Nhập địa chỉ chi tiết"
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
            placeholder="Nhập tên đường/phố"
          />
        </div>

        {/* Địa chỉ hiện tại */}
        <div className="post-form-group">
          <label className="post-label">Diện Tích</label>
          <input
            type="text"
            className="post-input"
            placeholder="Nhập địa chỉ chi tiết"
          />
        </div>
        <div className="post-form-group">
          <label className="post-label">Mức giá</label>
          <input
            type="text"
            className="post-input"
            placeholder="Nhập địa chỉ chi tiết"
          />
        </div>
      </div>
      <div className="post-form-section">
        <h3 className="post-h3">Thông tin liên hệ</h3>
        <div className="post-form-group">
          <label className="post-label">Tên người liên hệ</label>
          <input
            type="text"
            className="post-input"
            placeholder="Nhập tên người liên hệ"
          />
        </div>

        {/* Địa chỉ hiện tại */}
        <div className="post-form-group">
          <label className="post-label">Email</label>
          <input
            type="text"
            className="post-input"
            placeholder="Nhập email"
          />
        </div>
        <div className="post-form-group">
          <label className="post-label">Số điện thoại</label>
          <input
            type="text"
            className="post-input"
            placeholder="Nhập địa chỉ chi tiết"
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
          />
        </div>
        <div className="post-form-group">
          <label className="post-label">Mô tả</label>
          <input
            type="text"
            className="post-input"
            placeholder="Nhập thông tin mô tả"
          />
        </div>
      </div>
    </form>
  </div>
  );
};

export default Step1Form;
