import React, { useEffect, useState } from 'react';
import ReservationService from './Services/ReservationService';
import './ReservationList.css';

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all reservations when the component mounts
    ReservationService.getAllReservations()
      .then(data => {
        setReservations(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching reservations:", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this reservation?")) {
      ReservationService.deleteReservation(id)
        .then(() => {
          setReservations(reservations.filter(res => res.reservationId !== id));
        })
        .catch(error => {
          console.error("Error deleting reservation:", error);
        });
    }
  };

  return (
    <div className="reservation-list">
      <h2>Reservations</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="reservation-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Car ID</th>
              <th>Pickup Date</th>
              <th>Dropoff Date</th>
              <th>Total Price</th>
              <th>Extras</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(reservation => (
              <tr key={reservation.reservationId}>
                <td>{reservation.reservationId}</td>
                <td>{reservation.userId}</td>
                <td>{reservation.carId}</td>
                <td>{new Date(reservation.pickupDate).toLocaleString()}</td>
                <td>{new Date(reservation.dropoffDate).toLocaleString()}</td>
                <td>${reservation.totalPrice}</td>
                <td>
                  {reservation.extras && reservation.extras.length > 0
                    ? reservation.extras.map(extra => extra.name).join(', ')
                    : 'No Extras'}
                </td>
                <td>{reservation.status}</td>
                <td>
                  <button onClick={() => handleDelete(reservation.reservationId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReservationList;
