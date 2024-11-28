// src/Services/UserService.js
import axios from "axios";

const API_URL = "https://localhost:7020/api/User"; // Adjust the URL as needed

const getUsers = async () => {
  try {
    const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

export { getUsers, getUserById };
