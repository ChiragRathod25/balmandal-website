import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section about">
                    <h2>About Us</h2>
                    <p>We are a team of passionate developers building awesome websites.</p>
                </div>
                <div className="footer-section links">
                    <h2>Quick Links</h2>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#contact">Contact</a></li>
                        <li><a href="#about">About</a></li>
                    </ul>
                </div>
                <div className="footer-section contact">
                    <h2>Contact Us</h2>
                    <p>Email: info@example.com</p>
                    <p>Phone: +123 456 7890</p>
                </div>
            </div>
            <div className="footer-bottom">
                &copy; 2023 Your Company. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;