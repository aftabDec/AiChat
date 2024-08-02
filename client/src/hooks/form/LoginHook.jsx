import axios from "axios";

export const loginUser = async (credential) => {
  try {
    const token = localStorage.getItem("authToken"); // Replace with your token storage method
    const config = {
      withCredentials: true,
    };
    const response = await axios.post(
      "http://localhost:5000/api/v1/users/login",
      config
    );
    return { success: true, data: response.data.data };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
