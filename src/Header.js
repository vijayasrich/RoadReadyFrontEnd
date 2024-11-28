import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

const Header = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.setItem("token", "");
    navigate("/login");
  };

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {!auth ? (
            <li>
              <Link to="/login">Login</Link>
            </li>
          ) : (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
          <li>
            <Link to="/register">Register</Link>
          </li>
          {/*{auth && (
            <li>
              <Link to="/products">Products</Link>
            </li>
          )}*/}
        </ul>
      </nav>
    </header>
  );
};

export default Header;