import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BASE_URL from "../../config";
import { jwtDecode } from "jwt-decode";
const PaymentSuccess = () => {
  const location = useLocation();
  const [paymentInfo, setPaymentInfo] = useState({
    code: "",
    id: "",
    cancel: "",
    status: "",
    orderCode: "",
  });

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
  }, [location.search]);
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
    <h1
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      Bạn đã thanh toán thành công!
    </h1>
  );
};

export default PaymentSuccess;
