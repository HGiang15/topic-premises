import React from 'react';
import './Chatbot.css';

const Chatbot = () => {
    return (
        <div className="chatbot-container">
            <div className="chatbot-header">
                <h2>Chatbot</h2>
            </div>
            <div className="chatbot-content">
                <p>Chào bạn, tôi là chatbot. Hãy hỏi tôi bất kỳ câu hỏi nào!</p>
            </div>
            <input type="text" className="chatbot-input" placeholder="Gõ câu hỏi của bạn..." />
            <button className="chatbot-button">Gửi</button>
        </div>
    );
};

export default Chatbot;
