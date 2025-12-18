import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Payment() {
  const { items, getTotalPrice, clearCart } = useCart();
  const { isLoggedIn, getDiscount, user } = useAuth();
  const navigate = useNavigate();
  
  const subtotal = getTotalPrice();
  const discount = subtotal * getDiscount();
  const discountedTotal = subtotal - discount;
  const finalTotal = discountedTotal + 50;
  const [selectedBank, setSelectedBank] = useState('');
  const [transactionRef, setTransactionRef] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const ethiopianBanks = [
    { id: 1, name: 'Telebirr', type: 'Digital Wallet', account: '*1234' },
    { id: 2, name: 'CBE Birr', type: 'Digital Wallet', account: '*5678' },
    { id: 3, name: 'M-Pesa Ethiopia', type: 'Digital Wallet', account: '*9012' },
    { id: 4, name: 'HelloCash', type: 'Digital Wallet', account: '*3456' },
    { id: 5, name: 'Commercial Bank of Ethiopia', type: 'Bank', account: '1000123456789' },
    { id: 6, name: 'Awash Bank', type: 'Bank', account: '2000123456789' },
    { id: 7, name: 'Dashen Bank', type: 'Bank', account: '3000123456789' },
    { id: 8, name: 'Bank of Abyssinia', type: 'Bank', account: '4000123456789' },
    { id: 9, name: 'Wegagen Bank', type: 'Bank', account: '5000123456789' },
    { id: 10, name: 'United Bank', type: 'Bank', account: '6000123456789' },
    { id: 11, name: 'Nib International Bank', type: 'Bank', account: '7000123456789' },
    { id: 12, name: 'Cooperative Bank of Oromia', type: 'Bank', account: '8000123456789' }
  ];

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    
    if (!selectedBank || !transactionRef || !customerInfo.name || !customerInfo.phone) {
      alert('Please fill all required fields');
      return;
    }

    // Get user location and IP for tracking
    let userLocation = null;
    let userIP = null;
    
    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      userIP = ipData.ip;
    } catch (error) {
      console.log('IP detection failed');
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        userLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
      });
    }

    const orderData = {
      items: items,
      totalAmount: finalTotal,
      customerInfo: {
        ...customerInfo,
        userId: user?.id || null,
        isLoggedIn: isLoggedIn,
        userIP: userIP,
        userLocation: userLocation
      },
      paymentMethod: selectedBank,
      transactionReference: transactionRef,
      status: 'PENDING',
      discount: discount
    };

    // Create social media notification
    const socialNotification = {
      id: Date.now() + 1,
      type: 'order_placed',
      customerName: customerInfo.name,
      orderAmount: finalTotal,
      timestamp: new Date().toISOString(),
      status: 'unread',
      platform: 'website',
      userIP: userIP,
      userLocation: userLocation
    };

    try {
      // Mock order processing for development
      const orderId = Date.now();
      const mockOrder = {
        ...orderData,
        id: orderId,
        status: 'PENDING',
        orderDate: new Date().toISOString()
      };
      
      // Store order in localStorage
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push(mockOrder);
      localStorage.setItem('orders', JSON.stringify(orders));
      
      // Store payment in localStorage
      const payments = JSON.parse(localStorage.getItem('payments') || '[]');
      payments.push({
        id: orderId + 1,
        orderId: orderId,
        amount: orderData.totalAmount,
        paymentMethod: selectedBank,
        transactionReference: transactionRef,
        status: 'PENDING',
        paymentDate: new Date().toISOString()
      });
      localStorage.setItem('payments', JSON.stringify(payments));
      
      // Store social media notification
      const notifications = JSON.parse(localStorage.getItem('socialNotifications') || '[]');
      notifications.push(socialNotification);
      localStorage.setItem('socialNotifications', JSON.stringify(notifications));
      
      alert('Order placed successfully! Redirecting to admin for verification.');
      clearCart();
      navigate('/admin');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order. Please try again.');
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div>
      <header className="bg-danger text-white py-4">
        <div className="container text-center">
          <h1 className="display-4 fw-bold">PAYMENT & CHECKOUT</h1>
          <p className="lead">Complete your order with Ethiopian payment methods</p>
        </div>
      </header>

      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <form onSubmit={handleSubmitOrder}>
                {/* Customer Information */}
                <div className="card shadow-sm mb-4">
                  <div className="card-header bg-light">
                    <h5 className="mb-0">Customer Information</h5>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Full Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          value={customerInfo.name}
                          onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Phone Number *</label>
                        <input
                          type="tel"
                          className="form-control"
                          value={customerInfo.phone}
                          onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                          required
                        />
                      </div>
                      <div className="col-12 mb-3">
                        <label className="form-label">Delivery Address</label>
                        <textarea
                          className="form-control"
                          rows="3"
                          value={customerInfo.address}
                          onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="card shadow-sm mb-4">
                  <div className="card-header bg-light">
                    <h5 className="mb-0">Payment Method</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label fw-bold">Select Payment Method *</label>
                      <select 
                        className="form-select"
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        required
                      >
                        <option value="">Choose your payment method...</option>
                        <optgroup label="Digital Wallets">
                          {ethiopianBanks.filter(bank => bank.type === 'Digital Wallet').map(bank => (
                            <option key={bank.id} value={bank.name}>
                              {bank.name} - {bank.account}
                            </option>
                          ))}
                        </optgroup>
                        <optgroup label="Traditional Banks">
                          {ethiopianBanks.filter(bank => bank.type === 'Bank').map(bank => (
                            <option key={bank.id} value={bank.name}>
                              {bank.name} - {bank.account}
                            </option>
                          ))}
                        </optgroup>
                      </select>
                    </div>
                    {selectedBank && (
                      <div className="alert alert-info">
                        <strong>Selected:</strong> {selectedBank}
                        <br />
                        <strong>Account:</strong> {ethiopianBanks.find(b => b.name === selectedBank)?.account}
                        <br />
                        <strong>Type:</strong> {ethiopianBanks.find(b => b.name === selectedBank)?.type}
                      </div>
                    )}
                  </div>
                </div>

                {/* Transaction Reference */}
                <div className="card shadow-sm mb-4">
                  <div className="card-header bg-light">
                    <h5 className="mb-0">Payment Confirmation</h5>
                  </div>
                  <div className="card-body">
                    <div className="alert alert-info">
                      <i className="fas fa-info-circle"></i>
                      <strong> Payment Instructions:</strong>
                      <ol className="mb-0 mt-2">
                        <li>Transfer the total amount to the selected payment method</li>
                        <li>Enter the transaction reference number below</li>
                        <li>Our admin will verify the payment and process your order</li>
                      </ol>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Transaction Reference Number *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter transaction ID/reference"
                        value={transactionRef}
                        onChange={(e) => setTransactionRef(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/cart')}>
                    Back to Cart
                  </button>
                  <button type="submit" className="btn btn-danger">
                    <i className="fas fa-check"></i> Place Order
                  </button>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="col-lg-4">
              <div className="card shadow-sm">
                <div className="card-header bg-danger text-white">
                  <h5 className="mb-0">Order Summary</h5>
                </div>
                <div className="card-body">
                  {items.map(item => (
                    <div key={item.id} className="d-flex justify-content-between mb-2">
                      <span>{item.name} x{item.quantity}</span>
                      <span>{(item.price * item.quantity).toFixed(2)} Birr</span>
                    </div>
                  ))}
                  <hr />
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
                  <div className="d-flex justify-content-between">
                    <strong>Total:</strong>
                    <strong>{finalTotal.toFixed(2)} Birr</strong>
                  </div>
                  {isLoggedIn && (
                    <div className="alert alert-success alert-sm mt-2">
                      <i className="fas fa-tag"></i> Account Discount Applied!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Payment;