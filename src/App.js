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
import CarExtraList from "./CarExtraList";
import CarList from "./CarList";
import UserList from "./UserList";
import ReviewList from "./ReviewList";
import ReservationList from "./ReservationList";
import PaymentList from "./PaymentList";
import PasswordResetEmail from './PasswordResetEmail';
import PasswordResetForm from './PasswordResetForm';
import Home from "./Home";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="page-container">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route element={<PrivateRoute />}>
              <Route path="/cars" element={<CarList />} />
              <Route path="/carextras" element={<CarExtraList />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/reviews" element={<ReviewList />} />
              <Route path="/reservations" element={<ReservationList />} />
              <Route path="/payments" element={<PaymentList />} />
              <Route path="/reset-password" element={<PasswordResetEmail />} />
                <Route path="/reset-passwordtoken" element={<PasswordResetForm />} />

                {/*<Route path="/products" element={<ProductList />} />*/}
              </Route>
            </Routes>
          </main>
          <Footer />
        </div>
        <ToastContainer />
      </AuthProvider>
    </Router>
  );
}

export default App;