import React, { useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import BASE_URL from "../../config";
import "./TransactionHistory.css";
const TransactionHistory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]); // Lưu trữ dữ liệu giao dịch
  const token = localStorage.getItem("token");

  const fetchPosts = async () => {
    try {
      const userId = jwtDecode(token)?.id; // Lấy `id` từ token
      setIsLoading(true); // Bắt đầu tải
      const response = await fetch(`${BASE_URL}api/v1/payment/history/${userId}`);
      const result = await response.json();

      if (result.status === 200) {
        setTransactions(result.data); // Lưu dữ liệu giao dịch
      } else {
        console.error("Failed to fetch posts:", result.message);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false); // Kết thúc tải
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="manage-post">
      <h1 className="manage-post-title">Danh sách giao dịch</h1>
      {isLoading ? (
        <p>Đang tải...</p>
      ) : transactions.length > 0 ? (
        <table className="transaction-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Ngày tạo</th>
              
              <th>Số tiền</th>
              <th>Trạng thái</th>
              <th>Mô tả</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.createAt}</td>
                <td>{transaction.amountPayment.toLocaleString()} VND</td>
                <td>{transaction.statusPayment}</td>
                <td>{transaction.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Không có giao dịch nào.</p>
      )}
    </div>
  );
};

export default TransactionHistory;
