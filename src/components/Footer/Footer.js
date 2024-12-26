import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-footer">
            <div className="footer-container-footer">
                <p className="footer-text">&copy; 2024 N3. All rights reserved.</p>
                <div className="footer-links-footer">
                    <a href="/privacy" className="footer-link-footer">Privacy Policy</a>
                    <a href="/terms" className="footer-link-footer">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
