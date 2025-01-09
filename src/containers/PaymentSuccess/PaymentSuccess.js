import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BASE_URL from "../../config";
import { jwtDecode } from "jwt-decode";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentInfo, setPaymentInfo] = useState({
    code: "",
    id: "",
    cancel: "",
    status: "",
    orderCode: "",
  });
  const [countdown, setCountdown] = useState(5); // Đếm ngược 5 giây

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setPaymentInfo({
      code: searchParams.get("code"),
      id: searchParams.get("id"),
      cancel: searchParams.get("cancel"),
      status: searchParams.get("status"),
      orderCode: searchParams.get("orderCode"),
    });
    handleOrderPayment();

    // Đếm ngược 5 giây
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          clearInterval(interval); // Dừng đếm ngược khi về 0
          navigate("/overview"); // Quay lại màn hình /overview
        }
        return prevCountdown - 1;
      });
    }, 1000);

    // Dọn dẹp interval khi component bị unmount
    return () => clearInterval(interval);

  }, [location.search, navigate]);

  const token = localStorage.getItem("token");

  const handleOrderPayment = async () => {
    try {
      const searchParams = new URLSearchParams(location.search);
      const decoded = jwtDecode(token);
      const id = decoded?.id;
      const body = {
        orderId: searchParams.get("orderCode"),
        status: searchParams.get("status"),
        isCancelled: searchParams.get("cancel"),
      };

      const response = await fetch(
        `${BASE_URL}api/v1/payment/update-order-payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );

    } catch (error) {
      console.error("Error create-payment-link:", error);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", flexDirection: "column" }}>
      <h1>Bạn đã thanh toán thành công!</h1>
      <p>Đang chuyển hướng về trang Overview trong {countdown} giây...</p>
    </div>
  );
};

export default PaymentSuccess;
