import axios from "axios";

export const getAllCharacters = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/v1/character/get`
    );
    console.log("Parsed response data:", response.data);

    return { success: true, data: response.data.data };
  } catch (error) {
    console.error("Error in API call:", error.message);
    return { success: false, message: error.message };
  }
};
