import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
            <div className="home-container">
                <h1 className="home-heading">Welcome to N3 Topic</h1>
                <p className="home-subtitle">
                    Explore topics, chat with the bot, and get the information you need!
                </p>
                <a href="/chatbot" className="home-cta-button">Start Chatting</a>
            </div>
        </div>
    );
};

export default Home;
