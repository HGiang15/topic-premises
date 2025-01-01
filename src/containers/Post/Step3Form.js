import React from "react";
import moment from "moment"; // Cài đặt moment bằng npm install moment

const Step3Form = ({ selectedDays, setSelectedDays }) => {
  const handleDaySelection = (days, price) => {
    setSelectedDays({ days, price });
  };

  const today = moment().format("DD/MM/YYYY");

  return (
    <div className="post-form-container">
      <h3 className="post-h3">Lựa chọn số ngày đăng</h3>
      <form>
        {/* Lựa chọn số ngày */}
        <div className="day-selection-container">
          <button
            type="button"
            className={`day-selection-btn ${
              selectedDays?.days === 10 ? "selected" : ""
            }`}
            onClick={() => handleDaySelection(10, 25000)}
          >
            1 tháng
            <p
              className={`post-price-text ${
                selectedDays?.days === 10 ? "selected" : ""
              }`}
            >
              25.000 VND
            </p>
          </button>
          <button
            type="button"
            className={`day-selection-btn ${
              selectedDays?.days === 20 ? "selected" : ""
            }`}
            onClick={() => handleDaySelection(20, 45000)}
          >
            2 tháng
            <p
              className={`post-price-text ${
                selectedDays?.days === 20 ? "selected" : ""
              }`}
            >
              45.000 VND
            </p>
          </button>
          <button
            type="button"
            className={`day-selection-btn ${
              selectedDays?.days === 30 ? "selected" : ""
            }`}
            onClick={() => handleDaySelection(30, 60000)}
          >
            3 tháng
            <p
              className={`post-price-text ${
                selectedDays?.days === 30 ? "selected" : ""
              }`}
            >
              60.000 VND
            </p>
          </button>
        </div>
        <h3 className="post-h3">Hóa đơn</h3>
        {/* Hiển thị giá khi chọn */}
        {selectedDays && (
          <div className="invoice-container">
            <div className="invoice-row">
              <span className="invoice-label">Mã tin:</span>
              <span className="invoice-value">12345</span>
            </div>
            <div className="invoice-row">
              <span className="invoice-label">Ngày bắt đầu:</span>
              <span className="invoice-value">{today}</span>
            </div>
            <div className="invoice-row">
              <span className="invoice-label">Số ngày đăng:</span>
              <span className="invoice-value">{selectedDays.days} ngày</span>
            </div>
            <div className="invoice-row">
              <span className="invoice-label">Giá:</span>
              <span className="invoice-value">
                {selectedDays.price.toLocaleString()} VND
              </span>
            </div>
          </div>
        )}
        {/* Thanh toán */}
      </form>
    </div>
  );
};

export default Step3Form;
