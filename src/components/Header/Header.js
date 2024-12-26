import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="header-container">
                <a href="/" className="header-logo">N3 Topic</a>
                <nav className="header-nav">
                    <ul className="header-nav-list">
                        <li className="header-nav-item"><a href="/" className="header-nav-link">Home</a></li>
                        <li className="header-nav-item"><a href="/chatbot" className="header-nav-link">Chatbot</a></li>
                        <li className="header-nav-item"><a href="/login" className="header-nav-link">Login</a></li>
                        <li className="header-nav-item"><a href="/register" className="header-nav-link">Register</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
