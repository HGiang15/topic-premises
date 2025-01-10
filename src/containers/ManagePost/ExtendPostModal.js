// ExtendPostModal.js
import React, { useState } from "react";
import moment from "moment";
import BASE_URL from "../../config";
import { jwtDecode } from "jwt-decode";
const ExtendPostModal = ({ onClose, onSubmit, id }) => {
  const [selectedDays, setSelectedDays] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleDaySelection = (days, price) => {
    setSelectedDays({ days, price });
  };
  const handleExtendPost = async () => {
    try {
      const token = localStorage.getItem("token");
      setIsLoading(true); // Bắt đầu trạng thái đang tải
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }
  
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      const bodyData = {
        amountDaysProlong: selectedDays.days,
        amountMoneyPayment: selectedDays.price,
      };
  
      const response = await fetch(`${BASE_URL}api/v1/posts/prolong/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bodyData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Post update successfully:", data);
        alert("Gia hạn thành công!");
        window.location.reload();
      } else if (response.status === 400) {
        const errorData = await response.json();
        console.error("Error update post:", errorData);
        alert("Số tiền không đủ để gia hạn, vui lòng kiểm tra lại.");
      } else {
        console.error("Error update post:", response.statusText);
        alert("Có lỗi xảy ra, vui lòng thử lại sau.");
      }
    } catch (error) {
      console.error("Error during API call:", error);
      alert("Không thể kết nối đến máy chủ, vui lòng thử lại sau.");
    } finally {
      setIsLoading(false); // Đặt trạng thái isLoading về false khi kết thúc
    }
  };
  
  
  return (
    <div className="modal-overlay">
       {isLoading ? (
        <div className="product-loading-spinner">
          <div className="product-spinner"></div>
        </div>
      ) : (
      <div className="modal-content-extend-post">
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
        <div className="invoice-container">
          {selectedDays && (
            <>
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
            </>
          )}
        </div>
        <div
          className="modal-actions-posts"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <button
            onClick={onClose}
            className="close-btn"
            style={{
              padding: "10px 20px",
              backgroundColor: "#f44336", // Đỏ
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Đóng
          </button>
          <button
            className="submit-btn"
            onClick={() => handleExtendPost()}
            style={{
              padding: "10px 20px",
              backgroundColor: "#4CAF50", // Xanh lá
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Gia hạn
          </button>
        </div>
      </div>
      )}
    </div>
  );
};

export default ExtendPostModal;
