import React, { useEffect, useState } from 'react';
import PaymentService from './Services/PaymentService';
import './PaymentList.css';

const PaymentList = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all payments when the component mounts
  useEffect(() => {
    PaymentService.getAllPayments()
      .then(data => {
        setPayments(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching payments:", error);
        setLoading(false);
      });
  }, []);

  // Handle payment deletion
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this payment?")) {
      PaymentService.deletePayment(id)
        .then(() => {
          setPayments(payments.filter(payment => payment.paymentId !== id));
        })
        .catch(error => {
          console.error("Error deleting payment:", error);
        });
    }
  };

  return (
    <div className="payment-list">
      <h2>Payments</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="payment-table">
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Reservation ID</th>
              <th>Payment Method</th>
              <th>Payment Date</th>
              <th>Amount</th>
              <th>Payment Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment.paymentId}>
                <td>{payment.paymentId}</td>
                <td>{payment.reservationId}</td>
                <td>{payment.paymentMethod}</td>
                <td>{new Date(payment.paymentDate).toLocaleString()}</td>
                <td>${payment.amount}</td>
                <td>{payment.paymentStatus}</td>
                <td>
                  <button onClick={() => handleDelete(payment.paymentId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentList;
