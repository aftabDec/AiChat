import axios from "axios";

export const getCharacter = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/v1/character/get/${userId}`
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};
{
  /*this hook is for to get a user created characters in there profile*/
}
