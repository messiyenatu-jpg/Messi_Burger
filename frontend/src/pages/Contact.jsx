import React, { useState, useEffect } from 'react';

function Contact() {
  const [messageData, setMessageData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [userLocation, setUserLocation] = useState(null);
  const [userIP, setUserIP] = useState(null);

  useEffect(() => {
    // Get user's IP address
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => setUserIP(data.ip))
      .catch(error => console.log('IP detection failed:', error));

    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.log('Location detection failed:', error);
        }
      );
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newMessage = {
      id: Date.now(),
      ...messageData,
      timestamp: new Date().toISOString(),
      status: 'unread',
      adminReply: null,
      userIP: userIP,
      userLocation: userLocation,
      source: 'contact_form'
    };
    
    // Store message in localStorage
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    messages.push(newMessage);
    localStorage.setItem('contactMessages', JSON.stringify(messages));
    
    alert('Message sent successfully! We will get back to you soon.');
    setMessageData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setMessageData({ ...messageData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <header className="bg-danger text-white py-4">
        <div className="container text-center">
          <h1 className="display-4 fw-bold">CONTACT US</h1>
          <p className="lead">We'd love to hear from you. Get in touch with us!</p>
        </div>
      </header>

      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-6">
              <div className="card p-4 rounded shadow-sm h-100">
                <h3 className="text-danger mb-4"><i className="fas fa-map-marker-alt"></i> Visit Us</h3>
                
                <div className="mb-4">
                  <h5 className="text-danger">Main Restaurant</h5>
                  <p className="mb-2">
                    <i className="fas fa-location-dot me-2 text-danger"></i> 
                    Bole Atlas, Near Edna Mall, Addis Ababa, Ethiopia
                  </p>
                  <a href="https://maps.google.com/?q=9.0192,38.7525" target="_blank" rel="noreferrer" className="btn btn-outline-danger btn-sm">
                    <i className="fas fa-map-marker-alt"></i> View on Google Maps
                  </a>
                </div>
                
                <div className="mb-4">
                  <h5 className="text-danger">Contact Information</h5>
                  <p className="mb-2">
                    <i className="fas fa-phone me-2 text-danger"></i> 
                    +251 911 123 456
                  </p>
                  <p className="mb-2">
                    <i className="fas fa-envelope me-2 text-danger"></i> 
                    messiyenatu@gmail.com
                  </p>
                  <p className="mb-2">
                    <i className="fas fa-envelope me-2 text-danger"></i> 
                    mmesenbetshegaw@gmail.com
                  </p>
                  <p className="mb-2">
                    <i className="fab fa-telegram me-2 text-danger"></i> 
                    <a href="https://t.me/mmmessi" target="_blank" rel="noreferrer" className="text-decoration-none">@mmmessi</a>
                  </p>
                </div>
                
                <div className="mb-4">
                  <h5 className="text-danger">Opening Hours</h5>
                  <p className="mb-2">Monday - Friday: 9:00 AM - 10:00 PM</p>
                  <p className="mb-2">Saturday: 10:00 AM - 11:00 PM</p>
                  <p className="mb-0">Sunday: 10:00 AM - 9:00 PM</p>
                </div>
                
                <div>
                  <h5 className="text-danger">Follow Us</h5>
                  <div className="d-flex flex-wrap gap-2">
                    <a href="https://facebook.com/zomaburger" target="_blank" rel="noreferrer" className="btn btn-outline-primary btn-sm">
                      <i className="fab fa-facebook-f"></i> Facebook
                    </a>
                    <a href="https://instagram.com/zomaburger" target="_blank" rel="noreferrer" className="btn btn-outline-danger btn-sm">
                      <i className="fab fa-instagram"></i> Instagram
                    </a>
                    <a href="https://twitter.com/zomaburger" target="_blank" rel="noreferrer" className="btn btn-outline-info btn-sm">
                      <i className="fab fa-twitter"></i> Twitter
                    </a>
                    <a href="https://tiktok.com/@zomaburger" target="_blank" rel="noreferrer" className="btn btn-outline-dark btn-sm">
                      <i className="fab fa-tiktok"></i> TikTok
                    </a>
                    <a href="https://youtube.com/@zomaburger" target="_blank" rel="noreferrer" className="btn btn-outline-danger btn-sm">
                      <i className="fab fa-youtube"></i> YouTube
                    </a>
                    <a href="https://t.me/mmmessi" target="_blank" rel="noreferrer" className="btn btn-outline-primary btn-sm">
                      <i className="fab fa-telegram"></i> Telegram
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="card p-4 rounded shadow-sm h-100">
                <h3 className="text-danger mb-4"><i className="fas fa-paper-plane"></i> Send Us a Message</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Full Name:</label>
                    <input type="text" name="name" className="form-control" placeholder="Enter your full name" value={messageData.name} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Email Address:</label>
                    <input type="email" name="email" className="form-control" placeholder="Enter your email" value={messageData.email} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Subject:</label>
                    <input type="text" name="subject" className="form-control" placeholder="What is this regarding?" value={messageData.subject} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Message:</label>
                    <textarea name="message" className="form-control" rows="6" placeholder="Tell us how we can help you..." value={messageData.message} onChange={handleChange} required></textarea>
                  </div>
                  <button type="submit" className="btn btn-danger px-4 py-2 w-100">
                    <i className="fas fa-paper-plane"></i> Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-4">
            <h3 className="text-danger">Find Us on the Map</h3>
            <p className="text-muted">Located in the heart of Bole, Addis Ababa</p>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card shadow-sm">
                <div className="card-body p-0">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.3!2d38.7525!3d9.0192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85c1b1b1b1b1%3A0x1b1b1b1b1b1b1b1b!2sBole%20Atlas%2C%20Addis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2set!4v1234567890123!5m2!1sen!2set"
                    width="100%" 
                    height="400" 
                    style={{border: 0}} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Zoma Burger Location"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;