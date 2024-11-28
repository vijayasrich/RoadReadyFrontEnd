import React, { useEffect, useState } from "react";
import { getAllReviews } from "./Services/ReviewService";
import "./ReviewList.css";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getAllReviews();
        setReviews(data);
      } catch (error) {
        setError("Failed to fetch reviews.");
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="review-list">
      <h2>Review List</h2>
      {error && <p className="error">{error}</p>}
      {reviews.length > 0 ? (
        <table className="review-table">
          <thead>
            <tr>
              <th>Review ID</th>
              <th>Car ID</th>
              <th>Rating</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review.reviewId}>
                <td>{review.reviewId}</td>
                <td>{review.carId}</td>
                <td>{review.rating}</td>
                <td>{review.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
};

export default ReviewList;
