import axios from "axios";

export const characterById = async (characterId) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/v1/character/user/${characterId}`
    );
    console.log("Parsed response data:", response.data);

    return { success: true, data: response.data.data };
  } catch (error) {
    console.error("Error in API call:", error.message);
    return { success: false, message: error.message };
  }
};
{
  /*this hook is for to get a character to chat with them*/
}
