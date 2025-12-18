import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <header className="hero-section">
        <div className="container">
          <h1 className="display-3 fw-bold mb-4">ZOMA BURGER HOUSE</h1>
          <p className="lead mb-4">The Best Burgers in Town - Fresh, Juicy, and Delicious!</p>
          <Link to="/menu" className="btn btn-danger btn-lg me-3">
            <i className="fas fa-utensils"></i> View Menu
          </Link>
          <Link to="/contact" className="btn btn-outline-light btn-lg">
            <i className="fas fa-map-marker-alt"></i> Find Us
          </Link>
        </div>
      </header>

      <section id="home" className="py-5">
        <div className="container">
          <h2 className="text-center mb-5 text-danger">
            Welcome to ZOMA BURGER HOUSE
          </h2>
          
          {/* Special Offers Banner */}
          <div className="alert alert-warning text-center mb-5">
            <h4><i className="fas fa-tag"></i> SPECIAL OFFER!</h4>
            <p className="mb-0">Get 5% discount on all orders when you login! 🍔</p>
          </div>

          {/* Featured Burgers */}
          <h3 className="text-center mb-4">Our Featured Burgers</h3>
          <div className="row g-4 mb-5">
            <div className="col-md-4 text-center">
              <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop" alt="Classic Beef Burger" className="img-fluid rounded shadow-sm mb-2 burger-image" style={{height: '200px', objectFit: 'cover', width: '100%'}} />
              <h5>Classic Beef Burger</h5>
              <span className="price-badge">250 Birr</span>
            </div>
            <div className="col-md-4 text-center">
              <img src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300&h=200&fit=crop" alt="Cheeseburger Deluxe" className="img-fluid rounded shadow-sm mb-2 burger-image" style={{height: '200px', objectFit: 'cover', width: '100%'}} />
              <h5>Cheeseburger Deluxe</h5>
              <span className="price-badge">280 Birr</span>
            </div>
            <div className="col-md-4 text-center">
              <img src="https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=300&h=200&fit=crop" alt="Double Patty Burger" className="img-fluid rounded shadow-sm mb-2 burger-image" style={{height: '200px', objectFit: 'cover', width: '100%'}} />
              <h5>Double Patty Burger</h5>
              <span className="price-badge">350 Birr</span>
            </div>
          </div>
          
          {/* More Featured Items */}
          <div className="row g-4 mb-5">
            <div className="col-md-3 text-center">
              <img src="https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=250&h=150&fit=crop" alt="Chicken Burger" className="img-fluid rounded shadow-sm mb-2" style={{height: '150px', objectFit: 'cover', width: '100%'}} />
              <h6>Chicken Burger</h6>
              <span className="price-badge">220 Birr</span>
            </div>
            <div className="col-md-3 text-center">
              <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=250&h=150&fit=crop" alt="Veggie Burger" className="img-fluid rounded shadow-sm mb-2" style={{height: '150px', objectFit: 'cover', width: '100%'}} />
              <h6>Veggie Burger</h6>
              <span className="price-badge">190 Birr</span>
            </div>
            <div className="col-md-3 text-center">
              <img src="https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=250&h=150&fit=crop" alt="French Fries" className="img-fluid rounded shadow-sm mb-2" style={{height: '150px', objectFit: 'cover', width: '100%'}} />
              <h6>French Fries</h6>
              <span className="price-badge">80 Birr</span>
            </div>
            <div className="col-md-3 text-center">
              <img src="https://images.unsplash.com/photo-1551024506-0bccd828d307?w=250&h=150&fit=crop" alt="Soft Drinks" className="img-fluid rounded shadow-sm mb-2" style={{height: '150px', objectFit: 'cover', width: '100%'}} />
              <h6>Soft Drinks</h6>
              <span className="price-badge">40 Birr</span>
            </div>
          </div>
          
          <div className="card mb-5 shadow-sm">
            <div className="card-body text-center">
              <h3 className="text-danger">Why Choose Zoma Burger?</h3>
              <p className="card-text lead">Fresh ingredients, authentic recipes, and the best burgers in town! 
              From classic beef to vegetarian options, we have something for everyone.</p>
              <Link to="/menu" className="btn btn-danger btn-lg mt-3">
                <i className="fas fa-utensils"></i> View Full Menu
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="row text-center mt-5">
            <div className="col-md-3 mb-3">
              <Link to="/menu" className="btn btn-outline-danger w-100 py-3">
                <i className="fas fa-utensils fa-2x mb-2"></i><br />Full Menu
              </Link>
            </div>
            <div className="col-md-3 mb-3">
              <Link to="/cart" className="btn btn-outline-danger w-100 py-3">
                <i className="fas fa-shopping-cart fa-2x mb-2"></i><br />My Cart
              </Link>
            </div>
            <div className="col-md-3 mb-3">
              <Link to="/contact" className="btn btn-outline-danger w-100 py-3">
                <i className="fas fa-map-marker-alt fa-2x mb-2"></i><br />Locations
              </Link>
            </div>
            <div className="col-md-3 mb-3">
              <Link to="/menu" className="btn btn-outline-danger w-100 py-3">
                <i className="fas fa-mobile-alt fa-2x mb-2"></i><br />Order Online
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;