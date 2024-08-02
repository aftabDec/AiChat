import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addCharacterMessage } from "../../redux/characterSlice";

export const useCharacterChatHook = () => {
  const selectedCharacter = useSelector(
    (store) => store.char.selectedCharacter
  );
  const { authUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const sendMessage = async (message) => {
    try {
      const token = localStorage.getItem("authToken"); // Replace with your token storage method
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const userId = authUser.user._id;

      // Dispatch the user message to the Redux store
      dispatch(
        addCharacterMessage({
          characterId: selectedCharacter._id,
          message: {
            userId,
            message,
            timestamp: new Date().toISOString(), // Add a timestamp for sorting
          },
        })
      );

      // Make the API call to send the message
      const response = await axios.post(
        `http://localhost:5000/api/v1/chat`,
        {
          userId,
          message,
          characterId: selectedCharacter._id,
        },
        config
      );

      const { data } = response;

      // Dispatch the AI's response to the Redux store
      dispatch(
        addCharacterMessage({
          characterId: selectedCharacter._id,
          message: {
            userId: selectedCharacter._id,
            message: data.response || "No response",
            timestamp: data.timestamp || new Date().toISOString(),
          },
        })
      );

      return response.data;
    } catch (error) {
      console.error("Error in chat API call:", error.message);
    }
  };

  return sendMessage;
};
