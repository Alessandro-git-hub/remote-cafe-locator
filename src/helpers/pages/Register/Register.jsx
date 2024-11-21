import React, { useState } from 'react';
import './Register.css';
import { registerUser } from '../../../services/authService';

const Register = () => {
  const [userType, setUserType] = useState('customer');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    cafeName: '',
    cafeAddress: '',
    cafeFeatures: [],
    cafeDescription: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFeatureChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      cafeFeatures: checked
        ? [...prev.cafeFeatures, value]
        : prev.cafeFeatures.filter((feature) => feature !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await registerUser({ ...formData, userType });
    if (response.success) {
      setSuccess(response.message);
      setError(null);
    } else {
      setError(response.message);
      setSuccess(null);
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Sign Up</h2>
      {error && <p className="register-message error">{error}</p>}
      {success && <p className="register-message success">{success}</p>}
      <form className="register-form" onSubmit={handleSubmit}>
        <label>
          I am a:
          <select name="userType" value={userType} onChange={(e) => setUserType(e.target.value)}>
            <option value="customer">Customer</option>
            <option value="cafeOwner">Café Owner</option>
          </select>
        </label>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {userType === 'cafeOwner' && (
          <>
            <input
              type="text"
              name="cafeName"
              placeholder="Café Name"
              value={formData.cafeName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="cafeAddress"
              placeholder="Café Address"
              value={formData.cafeAddress}
              onChange={handleChange}
              required
            />
            <fieldset>
              <legend>Café Features</legend>
              <label>
                <input
                  type="checkbox"
                  name="cafeFeatures"
                  value="wifi"
                  onChange={handleFeatureChange}
                />
                Wi-Fi
              </label>
              <label>
                <input
                  type="checkbox"
                  name="cafeFeatures"
                  value="powerOutlets"
                  onChange={handleFeatureChange}
                />
                Power Outlets
              </label>
              <label>
                <input
                  type="checkbox"
                  name="cafeFeatures"
                  value="outdoorSeating"
                  onChange={handleFeatureChange}
                />
                Outdoor Seating
              </label>
            </fieldset>
            <textarea
              name="cafeDescription"
              placeholder="Café Description"
              value={formData.cafeDescription}
              onChange={handleChange}
            />
          </>
        )}

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;