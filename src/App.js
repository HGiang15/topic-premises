import React, { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import Chatbot from "./components/Chatbot/Chatbot";
import { AuthProvider } from "./components/AuthContext/AuthContext.js";
import "./App.css";

function App() {
    const [visitCount, setVisitCount] = useState(0);

    useEffect(() => {
        // Lấy số lượt truy cập từ LocalStorage
        const visits = localStorage.getItem("visitCount");

        // Nếu chưa có, khởi tạo là 1
        if (!visits) {
            localStorage.setItem("visitCount", "1");
            setVisitCount(1);
        } else {
            // Nếu có, tăng lên 1
            const newCount = parseInt(visits) + 1;
            localStorage.setItem("visitCount", newCount.toString());
            setVisitCount(newCount);
        }
    }, []);

    return (
        <div className="App">
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
            <Chatbot />
            {/* Hiển thị số lượng truy cập */}
            <div style={{ position: "fixed", bottom: "100px", right: "10px", background: "#f5f5f5", padding: "10px", borderRadius: "5px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
                <p>Số lượt truy cập: {visitCount}</p>
            </div>
        </div>
    );
}

export default App;
