import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await loginUser(credentials);
    if (result.success) {
      alert('Login successful!');
      navigate('/menu');
    } else {
      alert(result.message || 'Login failed');
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <header className="bg-danger text-white py-4">
        <div className="container text-center">
          <h1 className="display-4 fw-bold">WELCOME BACK!</h1>
          <p className="lead">Login to your account and enjoy 5% discount on all orders</p>
        </div>
      </header>

      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-body p-4">
                  <h2 className="card-title text-danger text-center mb-4">
                    <i className="fas fa-sign-in-alt"></i> Login
                  </h2>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        <i className="fas fa-envelope"></i> Email Address
                      </label>
                      <input type="email" name="email" className="form-control" placeholder="Enter your email" value={credentials.email} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        <i className="fas fa-lock"></i> Password
                      </label>
                      <input type="password" name="password" className="form-control" placeholder="Enter your password" value={credentials.password} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-danger w-100 py-2">
                      <i className="fas fa-sign-in-alt"></i> Login to Your Account
                    </button>
                  </form>
                  
                  <p className="text-center mt-3">
                    Don't have an account? <a href="/signup" className="text-danger fw-bold">Sign Up Now</a>
                  </p>
                  
                  <div className="mt-4 p-3 bg-light rounded">
                    <h6 className="text-danger mb-3">
                      <i className="fas fa-gift"></i> Benefits of Logging In:
                    </h6>
                    <ul className="list-unstyled mb-0">
                      <li><i className="fas fa-check text-success me-2"></i> 5% discount on all orders</li>
                      <li><i className="fas fa-check text-success me-2"></i> Faster checkout process</li>
                      <li><i className="fas fa-check text-success me-2"></i> Order history tracking</li>
                      <li><i className="fas fa-check text-success me-2"></i> Exclusive offers and promotions</li>
                    </ul>
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

export default Login;