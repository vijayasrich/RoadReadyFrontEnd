import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Customer"); // Default role is 'Customer'

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending the role along with other data
      await axios.post("/api/auth/register", { username, email, password, role });
      // Redirect to login page (optional)
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <i className="fas fa-user"></i>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </div>

        <div className="form-group">
          <i className="fas fa-envelope"></i>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>

        <div className="form-group">
          <i className="fas fa-lock"></i>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Admin">Admin</option>
            <option value="Agent">Agent</option>
            <option value="Customer">Customer</option>
          </select>
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
