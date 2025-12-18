import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    const result = await signup(formData);
    if (result.success) {
      alert('Account created successfully!');
      navigate('/login');
    } else {
      alert(result.message || 'Signup failed');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <header className="bg-danger text-white py-4">
        <div className="container text-center">
          <h1 className="display-4 fw-bold">JOIN ZOMA BURGER!</h1>
          <p className="lead">Create your account and get 5% discount on all orders</p>
        </div>
      </header>

      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-body p-4">
                  <h2 className="card-title text-danger text-center mb-4">
                    <i className="fas fa-user-plus"></i> Sign Up
                  </h2>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        <i className="fas fa-user"></i> Full Name
                      </label>
                      <input type="text" name="name" className="form-control" placeholder="Enter your full name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        <i className="fas fa-envelope"></i> Email Address
                      </label>
                      <input type="email" name="email" className="form-control" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        <i className="fas fa-phone"></i> Phone Number
                      </label>
                      <input type="tel" name="phone" className="form-control" placeholder="Enter your phone number" value={formData.phone} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        <i className="fas fa-lock"></i> Password
                      </label>
                      <input type="password" name="password" className="form-control" placeholder="Create a password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        <i className="fas fa-lock"></i> Confirm Password
                      </label>
                      <input type="password" name="confirmPassword" className="form-control" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-danger w-100 py-2">
                      <i className="fas fa-user-plus"></i> Create Account
                    </button>
                  </form>
                  
                  <p className="text-center mt-3">
                    Already have an account? <a href="/login" className="text-danger fw-bold">Login Here</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Signup;