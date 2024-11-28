import axios from "axios";

const API_URL = "https://localhost:7020/api/Cars"; // Adjust the URL to your backend endpoint

// Function to fetch all cars
const getCars = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token for authentication
      },
    });
    return response.data; // Return the fetched data
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw error; // Rethrow the error to be handled in the component
  }
};

// Function to fetch a single car by its ID
const getCarById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching car:", error);
    throw error;
  }
};

export { getCars, getCarById };
