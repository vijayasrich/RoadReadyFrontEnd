import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Header from "./Header";
import Footer from "./Footer";
import Register from "./Register";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//import ProductList from "./ProductList";
import Home from "./Home";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            {/*<Route path="/products" element={<ProductList />} />*/}
          </Route>
        </Routes>
        <Footer />
        <ToastContainer />
      </AuthProvider>
    </Router>
  );
}

export default App;