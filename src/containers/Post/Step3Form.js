import React, { useState } from "react";
import moment from "moment"; // Cài đặt moment bằng npm install moment

const Step3Form = ({ selectedDays, setSelectedDays }) => {
  const [showModal, setShowModal] = useState(false); // State để điều khiển hiển thị modal

  const handleDaySelection = (days, price) => {
    setSelectedDays({ days, price });
  };

  const today = moment().format("DD/MM/YYYY");

  // Tính toán ngày kết thúc
  const endDate = selectedDays?.days
    ? moment().add(selectedDays.days, "days").format("DD/MM/YYYY")
    : null;

  const handlePayment = () => {
    // Hiển thị modal khi thanh toán
    setShowModal(true);
  };

  const closeModal = () => {
    // Đóng modal
    setShowModal(false);
  };

  return (
    <div className="post-form-container">
      <h3 className="post-h3">Lựa chọn số ngày đăng</h3>
      <form>
        {/* Lựa chọn số ngày */}
        <div className="day-selection-container">
          <button
            type="button"
            className={`day-selection-btn ${
              selectedDays?.days === 30 ? "selected" : ""
            }`}
            onClick={() => handleDaySelection(30, 25000)}
          >
            1 tháng
            <p
              className={`post-price-text ${
                selectedDays?.days === 30 ? "selected" : ""
              }`}
            >
              25.000 VND
            </p>
          </button>
          <button
            type="button"
            className={`day-selection-btn ${
              selectedDays?.days === 60 ? "selected" : ""
            }`}
            onClick={() => handleDaySelection(60, 45000)}
          >
            2 tháng
            <p
              className={`post-price-text ${
                selectedDays?.days === 60 ? "selected" : ""
              }`}
            >
              45.000 VND
            </p>
          </button>
          <button
            type="button"
            className={`day-selection-btn ${
              selectedDays?.days === 90 ? "selected" : ""
            }`}
            onClick={() => handleDaySelection(90, 60000)}
          >
            3 tháng
            <p
              className={`post-price-text ${
                selectedDays?.days === 90 ? "selected" : ""
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
              <span className="invoice-label">Ngày kết thúc:</span>
              <span className="invoice-value">{endDate}</span>
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
        <button type="button" className="post-submit-btn" onClick={handlePayment}>
          Thanh toán
        </button>
      </form>

      {/* Modal thông báo thanh toán thành công */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Thanh toán thành công!</h4>
            <p>Cảm ơn bạn đã thực hiện giao dịch.</p>
            <button onClick={closeModal} className="close-btn">
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step3Form;
