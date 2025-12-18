import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const { isLoggedIn, getDiscount } = useAuth();
  const navigate = useNavigate();
  
  const subtotal = getTotalPrice();
  const discount = subtotal * getDiscount();
  const discountedTotal = subtotal - discount;
  const finalTotal = discountedTotal + 50;

  const handleCheckout = () => {
    if (items.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    // Navigate to payment processing
    navigate('/payment');
  };

  if (items.length === 0) {
    return (
      <div>
        <header className="bg-danger text-white py-4">
          <div className="container text-center">
            <h1 className="display-4 fw-bold">YOUR SHOPPING CART</h1>
            <p className="lead">Review your items and proceed to checkout</p>
          </div>
        </header>

        <section className="py-5 bg-light">
          <div className="container">
            <div className="card shadow-sm">
              <div className="card-body text-center py-5">
                <i className="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                <h3 className="text-muted">Your cart is empty</h3>
                <p className="text-muted">Browse our menu and add some delicious burgers!</p>
                <button onClick={() => navigate('/menu')} className="btn btn-danger mt-3">Start Shopping</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <header className="bg-danger text-white py-4">
        <div className="container text-center">
          <h1 className="display-4 fw-bold">YOUR SHOPPING CART</h1>
          <p className="lead">Review your items and proceed to checkout</p>
        </div>
      </header>

      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="card shadow-sm">
                <div className="card-header bg-light">
                  <h5 className="mb-0">Cart Items ({items.length})</h5>
                </div>
                <div className="card-body">
                  {items.map(item => (
                    <div key={item.id} className="row align-items-center border-bottom py-3">
                      <div className="col-md-2">
                        <img src={item.image} alt={item.name} className="img-fluid rounded" style={{height: '60px', objectFit: 'cover'}} />
                      </div>
                      <div className="col-md-4">
                        <h6 className="mb-1">{item.name}</h6>
                        <small className="text-muted">{item.description}</small>
                      </div>
                      <div className="col-md-2">
                        <span className="fw-bold">{item.price.toFixed(2)} Birr</span>
                      </div>
                      <div className="col-md-2">
                        <div className="input-group input-group-sm">
                          <button 
                            className="btn btn-outline-secondary" 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <input 
                            type="text" 
                            className="form-control text-center" 
                            value={item.quantity} 
                            readOnly 
                          />
                          <button 
                            className="btn btn-outline-secondary" 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="col-md-2 text-end">
                        <button 
                          className="btn btn-sm btn-outline-danger" 
                          onClick={() => removeFromCart(item.id)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="col-lg-4">
              <div className="card shadow-sm">
                <div className="card-header bg-danger text-white">
                  <h5 className="mb-0">Order Summary</h5>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal:</span>
                    <span>{subtotal.toFixed(2)} Birr</span>
                  </div>
                  {isLoggedIn && (
                    <div className="d-flex justify-content-between mb-2 text-success">
                      <span>Discount (5%):</span>
                      <span>-{discount.toFixed(2)} Birr</span>
                    </div>
                  )}
                  <div className="d-flex justify-content-between mb-2">
                    <span>Delivery:</span>
                    <span>50.00 Birr</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between mb-3">
                    <strong>Total:</strong>
                    <strong>{finalTotal.toFixed(2)} Birr</strong>
                  </div>
                  {isLoggedIn && (
                    <div className="alert alert-success alert-sm">
                      <i className="fas fa-tag"></i> You saved {discount.toFixed(2)} Birr with your account!
                    </div>
                  )}
                  <div className="d-grid gap-2">
                    <button className="btn btn-danger" onClick={handleCheckout}>
                      <i className="fas fa-credit-card"></i> Proceed to Checkout
                    </button>
                    <button className="btn btn-outline-secondary" onClick={() => navigate('/menu')}>
                      Continue Shopping
                    </button>
                    <button className="btn btn-outline-danger btn-sm" onClick={clearCart}>
                      Clear Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Cart;