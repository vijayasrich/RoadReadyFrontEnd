import axios from "axios";

const API_URL = "https://localhost:7020/api/Reviews"; 

export const getAllReviews = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};

export const getReviewByCarId = async (carId) => {
  try {
    const response = await axios.get(`${API_URL}/car/${carId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching review for carId ${carId}:`, error);
    throw error;
  }
};

export const addReview = async (review) => {
  try {
    const response = await axios.post(API_URL, review);
    return response.data;
  } catch (error) {
    console.error("Error adding review:", error);
    throw error;
  }
};

export const updateReview = async (review) => {
  try {
    const response = await axios.put(`${API_URL}/${review.reviewId}`, review);
    return response.data;
  } catch (error) {
    console.error("Error updating review:", error);
    throw error;
  }
};
