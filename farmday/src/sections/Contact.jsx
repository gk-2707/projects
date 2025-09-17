import React from 'react';
import img from '../assets/farmday.png';
import '../styles/contact.css'; // External CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faXTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Contact = () => {
    return (
        <section id="contact" className="contact-section">
            <h2 data-en="Contact Us" data-ta="தொடர்பு கொள்ள" className="contact-heading">
                Contact Us
            </h2>

            <div className="contact-wrapper">
                {/* Contact Details */}
                <div className="contact-left">
                    <div className="contact-info">
                        <div className="contact-item">
                            <FontAwesomeIcon icon={faPhoneAlt} className="contact-icon" />
                            <a href="tel:+919842765275">+91 98427 65275</a>
                        </div>
                        <div className="contact-item">
                            <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
                            <a href="mailto:support@farmday.co.in">support@farmday.co.in</a>
                        </div>
                    </div>

                    <div className="social-links">
                        <a href="https://www.facebook.com/farmday.in/" target="_blank" rel="noreferrer">
                            <FontAwesomeIcon icon={faFacebook} />
                        </a>
                        <a href="https://x.com/farmday_in" target="_blank" rel="noreferrer">
                            <FontAwesomeIcon icon={faXTwitter} />
                        </a>
                        <a href="https://www.instagram.com/farmday.in/" target="_blank" rel="noreferrer">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                    </div>
                </div>

                {/* Contact Image */}
                <div className="contact-right">
                    <img src={img} alt="FarmDay App" />
                </div>
            </div>
        </section>
    );
};

export default Contact;
