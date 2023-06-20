import React from "react";
import './footer.css'

const Footer = () => (
  <div className="footer">
    <div className="heading1">
      <h3>About</h3>
      <ul>
        <li>About Us</li>
        <li>Our Team</li>
        <li>Our Mission</li>
      </ul>
    </div>
    <div className="heading2">
      <h3>Pricing</h3>
      <ul>
        <li>Plans</li>
        <li>Features</li>
        <li>FAQ</li>
      </ul>
    </div>
    <div>
      <h3>Media</h3>
      <ul>
        <li>Press Releases</li>
        <li>News</li>
        <li>Events</li>
      </ul>
    </div>
    <div className="heading3">
      <h3>Contact</h3>
      <ul>
        <li>Phone: 123-456-7890</li>
        <li>Email: info@example.com</li>
        <li>Address: Sec 3, Noida, India</li>
      </ul>
    </div>
    {/* <p>Sagenext @2023.com</p> */}
  </div>
);

export default Footer;
