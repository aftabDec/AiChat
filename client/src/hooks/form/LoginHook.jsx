import axios from "axios";

export const loginUser = async (credential) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/users/login",
      credential
    );
    return { success: true, data: response.data.data };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
