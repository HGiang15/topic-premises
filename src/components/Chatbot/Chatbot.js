import React, { useState } from "react";
import "./Chatbot.css";
import axios from "axios";

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [userMessage, setUserMessage] = useState("");

    const toggleChatbot = () => {
        setIsOpen(!isOpen);
    };

    const convertMarkdownToHtml = (text) => {
        // Loại bỏ các dấu ** (để không hiển thị dưới dạng đậm)
        text = text.replace(/\*\*(.*?)\*\*/g, "$1"); // Xóa **bold**

        // Xử lý các ký tự đặc biệt khác
        text = text.replace(/\*(.*?)\*/g, "<em>$1</em>"); // *italic* vẫn giữ format in nghiêng
        text = text.replace(/\[([^\[]+)\]\((https?:\/\/[\S]+)\)/g, '<a href="$2" target="_blank">$1</a>'); // Links
        text = text.replace(/\n/g, "<br />"); // Thêm break line cho các dòng mới

        // Xử lý danh sách (bullet points)
        text = text.replace(/• (.*?)\n/g, "<ul><li>$1</li></ul>");
        return text;
    };

    const appendMessage = (role, message) => {
        const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        setMessages((prevMessages) => [...prevMessages, { role, message, time }]);
    };

    const sendMessage = async () => {
        if (!userMessage.trim()) return;

        appendMessage("user", userMessage);
        setUserMessage("");

        try {
            const response = await axios.post("http://127.0.0.1:5000/chat", { message: userMessage });
            appendMessage("model", response.data.response);
        } catch (error) {
            alert("Lỗi khi gửi tin nhắn.");
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    };

    const renderMessage = (msg) => {
        const roleText = msg.role === "user" ? "Bạn" : "Chatbot";
        return (
            <div className={`chat-message ${msg.role}`}>
                <div className="message">
                    <strong style={{ color: msg.role === "user" ? "#007bff" : "#6a11cb" }}>{roleText}:</strong>
                    <span dangerouslySetInnerHTML={{ __html: convertMarkdownToHtml(msg.message) }} />
                </div>
                <div className="time">{msg.time}</div>
            </div>
        );
    };

    return (
        <>
            {isOpen && (
                <div id="chatbot" className={`chatbot ${isOpen ? "open" : ""}`}>
                    <div className="chat-header">
                        <span>Chatbot</span>
                        <span className="close-btn" onClick={toggleChatbot}>
                            ×
                        </span>
                    </div>
                    <div id="chatbox" className="chatbox">
                        {messages.map((msg, index) => (
                            <div key={index}>{renderMessage(msg)}</div>
                        ))}
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nhập tin nhắn..."
                            value={userMessage}
                            onChange={(e) => setUserMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <button className="btn btn-primary" onClick={sendMessage}>
                            Gửi
                        </button>
                    </div>
                </div>
            )}
            <div id="chatButton" className={`chat-button ${isOpen ? "hidden" : ""}`} onClick={toggleChatbot}>
                💬
            </div>
        </>
    );
};

export default Chatbot;
