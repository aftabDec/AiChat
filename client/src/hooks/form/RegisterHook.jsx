import axios from "axios";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/users/register",
      userData
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};
