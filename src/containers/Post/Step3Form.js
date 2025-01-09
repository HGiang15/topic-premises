import React, { useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Step3Form = ({
  selectedDays,
  setSelectedDays,
  onNext,
  formData,
  setFormData,
  handleCreatePost,
}) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false); // Trạng thái xử lý
  const [errorMessage, setErrorMessage] = useState(null); // Lưu thông báo lỗi

  const handleDaySelection = (days, price) => {
    setSelectedDays({ days, price });
    setFormData((prevFormData) => ({
      ...prevFormData,
      amountExpiredDays: days,
      feeToPost: price,
    }));
  };

  const today = moment().format("DD/MM/YYYY");

  // Tính toán ngày kết thúc
  const endDate = selectedDays?.days
    ? moment().add(selectedDays.days, "days").format("DD/MM/YYYY")
    : null;

  const handlePayment = async () => {
    setLoading(true); // Bắt đầu xử lý
    setErrorMessage(null); // Xóa lỗi trước đó
    try {
      await handleCreatePost(); // Gọi hàm tạo bài viết
      setShowModal(true); // Hiển thị modal khi thành công
    } catch (error) {
      setErrorMessage("Đã xảy ra lỗi khi tạo bài viết. Vui lòng thử lại."); // Báo lỗi
    } finally {
      setLoading(false); // Kết thúc xử lý
    }
  };

  const closeModal = () => {
    setShowModal(false);
    navigate("/managepost");
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

        {/* Hiển thị trạng thái xử lý */}
        {loading && <p className="loading-text">Đang xử lý...</p>}

        {/* Hiển thị lỗi nếu có */}
        {errorMessage && <p className="error-text">{errorMessage}</p>}

        {/* Thanh toán */}
        <button
          type="button"
          className="post-submit-btn"
          onClick={handlePayment}
          disabled={loading}
        >
          Thanh toán
        </button>
      </form>

      {/* Modal thông báo thanh toán thành công */}
      {showModal && (
        <div className="modal-overlay-step3">
          <div className="modal-content-step3">
            <h4 className="modal-title">Thanh toán thành công!</h4>
            <p className="modal-message">Cảm ơn bạn đã thực hiện giao dịch.</p>
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
