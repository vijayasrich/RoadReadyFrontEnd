import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = () => {
    // Fetch cars without authentication token
    axios.get('https://localhost:7020/api/Cars')
      .then(response => {
        setCars(response.data);
        console.log('Fetched cars:', response.data);
      })
      .catch(error => {
        console.error('Error fetching cars:', error);
        setError('Error fetching cars');
      });
  };

  return (
    <div>
      <h1>Car List</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <ul>
        {cars.map(car => (
          <li key={car.carId}>
            <h3>{car.make} {car.model}</h3>
            <p>Price per day: ${car.pricePerDay}</p>
            <p>Location: {car.location}</p>
            <p>Availability: {car.availability ? 'Available' : 'Not Available'}</p>
            <img src={car.imageUrl} alt={`${car.make} ${car.model}`} width="200" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
