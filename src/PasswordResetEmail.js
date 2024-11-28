import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import AuthContext from './AuthContext'; // Your AuthContext

const PasswordResetEmail = () => {
  const { auth } = useContext(AuthContext); // Get auth from context
  const navigate = useNavigate(); // Access the navigate function for navigation

  // State hooks
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Effect to redirect if the user is authenticated
  useEffect(() => {
    if (auth) {
      // Redirect to home or any other page if the user is logged in
      navigate("/home");
    }
  }, [auth, navigate]); // This will run when auth value changes

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setMessage('');
      const response = await axios.post('https://localhost:7020/api/PasswordReset/send-reset-email', { email });
      setMessage(response.data); // Success message
    } catch (err) {
      setError(err.response?.data || 'Error sending email');
    }
  };

  // Only render the form if the user is NOT authenticated
  if (auth) {
    return null; // User is logged in, do not show the reset form
  }

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
          required
        />
        <button type="submit">Send Reset Email</button>
      </form>

      {message && <p>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default PasswordResetEmail;
