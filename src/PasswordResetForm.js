import React, { useState, useEffect } from 'react';

const PasswordResetForm = () => {
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // Extract the reset token from the URL query string
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setResetToken(urlParams.get('token'));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    // Send the reset request to the backend
    const response = await fetch('https://localhost:7020/api/PasswordReset/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resetToken, newPassword }),
    });

    if (response.ok) {
      alert('Password reset successfully!');
      window.location.href = '/login'; // Redirect to login page
    } else {
      const data = await response.json();
      setError(data.message || 'An error occurred');
    }
  };

  return (
    <div>
      <h2>Reset Your Password</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="resetToken" value={resetToken} />

        <div>
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default PasswordResetForm;
