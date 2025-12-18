import React, { useState, useEffect } from 'react';

function Admin() {
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({ username: '', password: '' });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordChange, setPasswordChange] = useState({ current: '', new: '', confirm: '' });
  const [messages, setMessages] = useState([]);
  const [replyMessage, setReplyMessage] = useState({ messageId: null, reply: '' });
  const [socialNotifications, setSocialNotifications] = useState([]);

  useEffect(() => {
    const adminSession = localStorage.getItem('adminSession');
    if (adminSession === 'true') {
      setIsAdminLoggedIn(true);
      fetchOrders();
      fetchPayments();
      fetchMessages();
      fetchSocialNotifications();
    } else {
      setLoading(false);
    }
  }, []);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    const storedPassword = localStorage.getItem('adminPassword') || '7009';
    if (adminCredentials.username === 'messi' && adminCredentials.password === storedPassword) {
      setIsAdminLoggedIn(true);
      localStorage.setItem('adminSession', 'true');
      fetchOrders();
      fetchPayments();
      fetchMessages();
    } else {
      alert('Invalid admin credentials!');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('adminSession');
    setAdminCredentials({ username: '', password: '' });
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    const currentPassword = localStorage.getItem('adminPassword') || '7009';
    if (passwordChange.current !== currentPassword) {
      alert('Current password is incorrect!');
      return;
    }
    if (passwordChange.new !== passwordChange.confirm) {
      alert('New passwords do not match!');
      return;
    }
    if (passwordChange.new.length < 4) {
      alert('Password must be at least 4 characters!');
      return;
    }
    localStorage.setItem('adminPassword', passwordChange.new);
    alert('Password changed successfully!');
    setShowPasswordChange(false);
    setPasswordChange({ current: '', new: '', confirm: '' });
  };

  const fetchOrders = async () => {
    try {
      const data = JSON.parse(localStorage.getItem('orders') || '[]');
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchPayments = async () => {
    try {
      const data = JSON.parse(localStorage.getItem('payments') || '[]');
      setPayments(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching payments:', error);
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    try {
      const data = JSON.parse(localStorage.getItem('contactMessages') || '[]');
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const fetchSocialNotifications = async () => {
    try {
      const data = JSON.parse(localStorage.getItem('socialNotifications') || '[]');
      setSocialNotifications(data);
    } catch (error) {
      console.error('Error fetching social notifications:', error);
    }
  };

  const markNotificationAsRead = (notificationId) => {
    const updatedNotifications = socialNotifications.map(notif => 
      notif.id === notificationId ? { ...notif, status: 'read' } : notif
    );
    setSocialNotifications(updatedNotifications);
    localStorage.setItem('socialNotifications', JSON.stringify(updatedNotifications));
  };

  const markMessageAsRead = (messageId) => {
    const updatedMessages = messages.map(msg => 
      msg.id === messageId ? { ...msg, status: 'read' } : msg
    );
    setMessages(updatedMessages);
    localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
  };

  const sendReply = (messageId) => {
    if (!replyMessage.reply.trim()) {
      alert('Please enter a reply message');
      return;
    }
    
    const updatedMessages = messages.map(msg => 
      msg.id === messageId ? { 
        ...msg, 
        adminReply: replyMessage.reply,
        status: 'replied',
        replyDate: new Date().toISOString()
      } : msg
    );
    
    setMessages(updatedMessages);
    localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
    
    // Simulate email notification
    const message = updatedMessages.find(m => m.id === messageId);
    alert(`Email sent to ${message.email}:\n\nSubject: Re: ${message.subject}\n\nDear ${message.name},\n\n${replyMessage.reply}\n\nBest regards,\nZoma Burger Team`);
    
    setReplyMessage({ messageId: null, reply: '' });
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const updatedOrders = orders.map(order => 
        order.id === orderId ? { ...order, status } : order
      );
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const verifyPayment = async (paymentId, status) => {
    try {
      const payments = JSON.parse(localStorage.getItem('payments') || '[]');
      const updatedPayments = payments.map(payment => 
        payment.id === paymentId ? { ...payment, status } : payment
      );
      localStorage.setItem('payments', JSON.stringify(updatedPayments));
      fetchPayments();
      fetchOrders();
    } catch (error) {
      console.error('Error verifying payment:', error);
    }
  };

  if (!isAdminLoggedIn) {
    return (
      <div className="min-vh-100 d-flex align-items-center bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-4">
              <div className="card shadow">
                <div className="card-body p-4">
                  <div className="text-center mb-4">
                    <i className="fas fa-shield-alt fa-3x text-danger mb-3"></i>
                    <h3 className="text-danger">Admin Login</h3>
                    <p className="text-muted">Secure access to admin dashboard</p>
                  </div>
                  <form onSubmit={handleAdminLogin}>
                    <div className="mb-3">
                      <label className="form-label">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        value={adminCredentials.username}
                        onChange={(e) => setAdminCredentials({...adminCredentials, username: e.target.value})}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        value={adminCredentials.password}
                        onChange={(e) => setAdminCredentials({...adminCredentials, password: e.target.value})}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-danger w-100">
                      <i className="fas fa-sign-in-alt"></i> Login
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <header className="bg-danger text-white py-3">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="h3 mb-0">Admin Dashboard</h1>
              <small>Welcome, messi</small>
            </div>
            <div>
              <button className="btn btn-outline-light btn-sm me-2" onClick={() => setShowPasswordChange(true)}>
                <i className="fas fa-key"></i> Change Password
              </button>
              <button className="btn btn-outline-light btn-sm" onClick={handleAdminLogout}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-light border-bottom">
        <div className="container">
          <ul className="nav nav-tabs border-0">
            <li className="nav-item">
              <button className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
                <i className="fas fa-tachometer-alt"></i> Dashboard
              </button>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
                <i className="fas fa-shopping-bag"></i> Orders
              </button>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${activeTab === 'payments' ? 'active' : ''}`} onClick={() => setActiveTab('payments')}>
                <i className="fas fa-credit-card"></i> Payments
              </button>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${activeTab === 'customers' ? 'active' : ''}`} onClick={() => setActiveTab('customers')}>
                <i className="fas fa-users"></i> Customers
              </button>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${activeTab === 'messages' ? 'active' : ''}`} onClick={() => setActiveTab('messages')}>
                <i className="fas fa-envelope"></i> Messages 
                {messages.filter(m => m.status === 'unread').length > 0 && (
                  <span className="badge bg-danger ms-1">{messages.filter(m => m.status === 'unread').length}</span>
                )}
              </button>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${activeTab === 'social' ? 'active' : ''}`} onClick={() => setActiveTab('social')}>
                <i className="fas fa-share-alt"></i> Social Media 
                {socialNotifications.filter(n => n.status === 'unread').length > 0 && (
                  <span className="badge bg-warning ms-1">{socialNotifications.filter(n => n.status === 'unread').length}</span>
                )}
              </button>
            </li>
          </ul>
        </div>
      </div>

      {showPasswordChange && (
        <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Change Admin Password</h5>
                <button className="btn-close" onClick={() => setShowPasswordChange(false)}></button>
              </div>
              <form onSubmit={handlePasswordChange}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Current Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={passwordChange.current}
                      onChange={(e) => setPasswordChange({...passwordChange, current: e.target.value})}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={passwordChange.new}
                      onChange={(e) => setPasswordChange({...passwordChange, new: e.target.value})}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Confirm New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={passwordChange.confirm}
                      onChange={(e) => setPasswordChange({...passwordChange, confirm: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowPasswordChange(false)}>Cancel</button>
                  <button type="submit" className="btn btn-danger">Change Password</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <section className="py-4">
        <div className="container">
          {activeTab === 'dashboard' && (
            <>
              <div className="row mb-4">
                <div className="col-md-3 mb-3">
                  <div className="card bg-primary text-white">
                    <div className="card-body text-center">
                      <h3>{orders.length}</h3>
                      <p className="mb-0">Total Orders</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="card bg-success text-white">
                    <div className="card-body text-center">
                      <h3>{orders.filter(o => o.status === 'DELIVERED').length}</h3>
                      <p className="mb-0">Delivered</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="card bg-warning text-dark">
                    <div className="card-body text-center">
                      <h3>{payments.filter(p => p.status === 'PENDING').length}</h3>
                      <p className="mb-0">Pending Payments</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="card bg-info text-white">
                    <div className="card-body text-center">
                      <h3>{socialNotifications.filter(n => n.status === 'unread').length}</h3>
                      <p className="mb-0">Social Notifications</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="row">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0">Recent Orders</h5>
                    </div>
                    <div className="card-body">
                      {orders.slice(0, 5).map(order => (
                        <div key={order.id} className="d-flex justify-content-between border-bottom py-2">
                          <div>
                            <strong>#{order.id}</strong>
                            <br />
                            <small>{order.customerInfo?.name}</small>
                            {order.items && order.items.length > 0 && (
                              <br />
                            )}
                            {order.items && order.items.slice(0, 2).map((item, index) => (
                              <small key={index} className="text-primary d-block">
                                {item.name} x{item.quantity}
                              </small>
                            ))}
                            {order.items && order.items.length > 2 && (
                              <small className="text-muted">+{order.items.length - 2} more items</small>
                            )}
                          </div>
                          <div className="text-end">
                            <span className="badge bg-warning">{order.status}</span>
                            <br />
                            <small>{order.totalAmount} Birr</small>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0">Pending Payments</h5>
                    </div>
                    <div className="card-body">
                      {payments.filter(p => p.status === 'PENDING').slice(0, 5).map(payment => (
                        <div key={payment.id} className="d-flex justify-content-between border-bottom py-2">
                          <div>
                            <strong>{payment.paymentMethod}</strong>
                            <br />
                            <small>{payment.transactionReference}</small>
                          </div>
                          <div className="text-end">
                            <span className="badge bg-warning">Pending</span>
                            <br />
                            <small>{payment.amount} Birr</small>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'orders' && (
            <div className="row">
              <div className="col-12 mb-4">
                <div className="card shadow-sm">
                  <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">Recent Orders ({orders.length})</h5>
                  </div>
                  <div className="card-body">
                    {orders.length === 0 ? (
                      <p className="text-muted text-center">No orders found</p>
                    ) : (
                      orders.map(order => (
                        <div key={order.id} className="border-bottom pb-3 mb-3">
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <h6 className="mb-1">Order #{order.id}</h6>
                              <p className="mb-1"><strong>Customer:</strong> {order.customerInfo?.name}</p>
                              <p className="mb-1"><strong>Phone:</strong> {order.customerInfo?.phone}</p>
                              
                              {/* Display ordered burger items */}
                              {order.items && order.items.length > 0 && (
                                <div className="mb-2">
                                  <strong>Items Ordered:</strong>
                                  <ul className="mb-1 mt-1 small">
                                    {order.items.map((item, index) => (
                                      <li key={index} className="text-primary">
                                        <strong>{item.name}</strong> x{item.quantity} - {(item.price * item.quantity).toFixed(2)} Birr
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              
                              <p className="mb-1"><strong>Total:</strong> {order.totalAmount} Birr</p>
                              <small className="text-muted">
                                {new Date(order.orderDate).toLocaleString()}
                              </small>
                            </div>
                            <div className="text-end">
                              <span className={`badge ${
                                order.status === 'PENDING' ? 'bg-warning' :
                                order.status === 'CONFIRMED' ? 'bg-success' :
                                order.status === 'DELIVERED' ? 'bg-primary' : 'bg-secondary'
                              }`}>
                                {order.status}
                              </span>
                              <div className="mt-2">
                                <select 
                                  className="form-select form-select-sm"
                                  value={order.status}
                                  onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                >
                                  <option value="PENDING">Pending</option>
                                  <option value="CONFIRMED">Confirmed</option>
                                  <option value="PREPARING">Preparing</option>
                                  <option value="READY">Ready</option>
                                  <option value="DELIVERED">Delivered</option>
                                  <option value="CANCELLED">Cancelled</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="row">
              <div className="col-12 mb-4">
                <div className="card shadow-sm">
                  <div className="card-header bg-warning text-dark">
                    <h5 className="mb-0">Payment Verification ({payments.length})</h5>
                  </div>
                  <div className="card-body">
                    {payments.length === 0 ? (
                      <p className="text-muted text-center">No payments to verify</p>
                    ) : (
                      payments.map(payment => (
                        <div key={payment.id} className="border-bottom pb-3 mb-3">
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <h6 className="mb-1">Payment #{payment.id}</h6>
                              <p className="mb-1"><strong>Order:</strong> #{payment.orderId}</p>
                              <p className="mb-1"><strong>Method:</strong> {payment.paymentMethod}</p>
                              <p className="mb-1"><strong>Reference:</strong> {payment.transactionReference}</p>
                              <p className="mb-1"><strong>Amount:</strong> {payment.amount} Birr</p>
                              <small className="text-muted">
                                {new Date(payment.paymentDate).toLocaleString()}
                              </small>
                            </div>
                            <div className="text-end">
                              <span className={`badge ${
                                payment.status === 'PENDING' ? 'bg-warning' :
                                payment.status === 'VERIFIED' ? 'bg-success' : 'bg-danger'
                              }`}>
                                {payment.status}
                              </span>
                              {payment.status === 'PENDING' && (
                                <div className="mt-2">
                                  <button 
                                    className="btn btn-success btn-sm me-1"
                                    onClick={() => verifyPayment(payment.id, 'VERIFIED')}
                                  >
                                    Verify
                                  </button>
                                  <button 
                                    className="btn btn-danger btn-sm"
                                    onClick={() => verifyPayment(payment.id, 'REJECTED')}
                                  >
                                    Reject
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'customers' && (
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Customer Management</h5>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Customer</th>
                            <th>Phone</th>
                            <th>IP Address</th>
                            <th>Location</th>
                            <th>Orders</th>
                            <th>Total Spent</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.from(new Set(orders.map(o => o.customerInfo?.name))).filter(Boolean).map(customerName => {
                            const customerOrders = orders.filter(o => o.customerInfo?.name === customerName);
                            const totalSpent = customerOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
                            const latestOrder = customerOrders[0];
                            return (
                              <tr key={customerName}>
                                <td>{customerName}</td>
                                <td>{latestOrder?.customerInfo?.phone}</td>
                                <td>{latestOrder?.customerInfo?.userIP || 'Unknown'}</td>
                                <td>
                                  {latestOrder?.customerInfo?.userLocation ? (
                                    <a 
                                      href={`https://maps.google.com/?q=${latestOrder.customerInfo.userLocation.latitude},${latestOrder.customerInfo.userLocation.longitude}`}
                                      target="_blank"
                                      className="btn btn-sm btn-outline-primary"
                                    >
                                      <i className="fas fa-map-marker-alt"></i> View
                                    </a>
                                  ) : (
                                    <span className="text-muted">No location</span>
                                  )}
                                </td>
                                <td>{customerOrders.length}</td>
                                <td>{totalSpent.toFixed(2)} Birr</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'social' && (
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Social Media & Customer Activity ({socialNotifications.length})</h5>
                  </div>
                  <div className="card-body">
                    {socialNotifications.length === 0 ? (
                      <p className="text-muted text-center">No social media activity</p>
                    ) : (
                      socialNotifications.map(notification => (
                        <div key={notification.id} className={`card mb-3 ${notification.status === 'unread' ? 'border-warning' : ''}`}>
                          <div className="card-header d-flex justify-content-between align-items-center">
                            <div>
                              <strong>
                                <i className="fas fa-shopping-bag text-success me-2"></i>
                                New Order from {notification.customerName}
                              </strong>
                              <br />
                              <small className="text-muted">{new Date(notification.timestamp).toLocaleString()}</small>
                            </div>
                            <div>
                              <span className={`badge ${
                                notification.status === 'unread' ? 'bg-warning' : 'bg-success'
                              }`}>
                                {notification.status}
                              </span>
                              {notification.status === 'unread' && (
                                <button 
                                  className="btn btn-sm btn-outline-primary ms-2"
                                  onClick={() => markNotificationAsRead(notification.id)}
                                >
                                  Mark as Read
                                </button>
                              )}
                            </div>
                          </div>
                          <div className="card-body">
                            <div className="row">
                              <div className="col-md-6">
                                <p className="mb-2"><strong>Order Amount:</strong> {notification.orderAmount} Birr</p>
                                <p className="mb-2"><strong>Platform:</strong> {notification.platform}</p>
                                <p className="mb-2"><strong>Customer IP:</strong> {notification.userIP || 'Unknown'}</p>
                              </div>
                              <div className="col-md-6">
                                {notification.userLocation && (
                                  <div>
                                    <p className="mb-2"><strong>Customer Location:</strong></p>
                                    <a 
                                      href={`https://maps.google.com/?q=${notification.userLocation.latitude},${notification.userLocation.longitude}`}
                                      target="_blank"
                                      className="btn btn-outline-primary btn-sm"
                                    >
                                      <i className="fas fa-map-marker-alt"></i> View Location on Map
                                    </a>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <div className="mt-3">
                              <h6 className="text-danger">Suggested Social Media Posts:</h6>
                              <div className="alert alert-light">
                                <strong>Facebook/Instagram:</strong> "🍔 Another happy customer just ordered {notification.orderAmount} Birr worth of delicious burgers! Thank you {notification.customerName}! #ZomaBurger #AddisAbaba"
                              </div>
                              <div className="alert alert-light">
                                <strong>Twitter:</strong> "🎉 New order alert! {notification.customerName} just chose Zoma Burger for their meal. We're grateful for your trust! 🍔 #CustomerLove"
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Customer Messages ({messages.length})</h5>
                  </div>
                  <div className="card-body">
                    {messages.length === 0 ? (
                      <p className="text-muted text-center">No messages received</p>
                    ) : (
                      messages.map(message => (
                        <div key={message.id} className={`card mb-3 ${message.status === 'unread' ? 'border-warning' : ''}`}>
                          <div className="card-header d-flex justify-content-between align-items-center">
                            <div>
                              <strong>{message.name}</strong> - {message.email}
                              <br />
                              <small className="text-muted">{new Date(message.timestamp).toLocaleString()}</small>
                            </div>
                            <div>
                              <span className={`badge ${
                                message.status === 'unread' ? 'bg-warning' :
                                message.status === 'replied' ? 'bg-success' : 'bg-info'
                              }`}>
                                {message.status}
                              </span>
                              {message.status === 'unread' && (
                                <button 
                                  className="btn btn-sm btn-outline-primary ms-2"
                                  onClick={() => markMessageAsRead(message.id)}
                                >
                                  Mark as Read
                                </button>
                              )}
                            </div>
                          </div>
                          <div className="card-body">
                            <h6 className="text-danger">Subject: {message.subject}</h6>
                            <p className="mb-3">{message.message}</p>
                            
                            {message.adminReply && (
                              <div className="alert alert-success">
                                <strong>Your Reply:</strong>
                                <p className="mb-1">{message.adminReply}</p>
                                <small className="text-muted">Sent: {new Date(message.replyDate).toLocaleString()}</small>
                              </div>
                            )}
                            
                            {!message.adminReply && (
                              <div className="mt-3">
                                {replyMessage.messageId === message.id ? (
                                  <div>
                                    <textarea 
                                      className="form-control mb-2"
                                      rows="3"
                                      placeholder="Type your reply..."
                                      value={replyMessage.reply}
                                      onChange={(e) => setReplyMessage({...replyMessage, reply: e.target.value})}
                                    />
                                    <button 
                                      className="btn btn-success btn-sm me-2"
                                      onClick={() => sendReply(message.id)}
                                    >
                                      <i className="fas fa-paper-plane"></i> Send Reply
                                    </button>
                                    <button 
                                      className="btn btn-secondary btn-sm"
                                      onClick={() => setReplyMessage({messageId: null, reply: ''})}
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                ) : (
                                  <button 
                                    className="btn btn-primary btn-sm"
                                    onClick={() => setReplyMessage({messageId: message.id, reply: ''})}
                                  >
                                    <i className="fas fa-reply"></i> Reply
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Admin;