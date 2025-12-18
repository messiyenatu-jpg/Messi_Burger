import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>Zoma Burger House</h5>
            <p>Best burgers in Addis Ababa</p>
          </div>
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/home" className="text-white">Home</a></li>
              <li><a href="/menu" className="text-white">Menu</a></li>
              <li><a href="/contact" className="text-white">Contact</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Contact Info</h5>
            <p><i className="fas fa-phone"></i> +251 123 456 789</p>
            <p><i className="fas fa-envelope"></i> info@zomaburger.com</p>
          </div>
        </div>
        <hr className="my-3" />
        <p className="text-center mb-0">© 2025 Zoma Burger House. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;