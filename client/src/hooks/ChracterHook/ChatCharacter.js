import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addCharacterMessage } from "../../redux/characterSlice";

export const useCharacterChatHook = () => {
  const selectedCharacter = useSelector(
    (store) => store.char.selectedCharacter
  );
  const { authUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();
console.log(selectedCharacter);

  const sendMessage = async (message) => {
    if (!selectedCharacter || !authUser || !authUser.user) {
      console.error("User or selected character is not defined.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const userId = authUser.user._id;
      const characterId = selectedCharacter._id;

      console.log("Dispatching user message...");
      dispatch(
        addCharacterMessage({
          characterId,
          message: {
            userId,
            message,
            timestamp: new Date().toISOString(),
          },
        })
      );

      const response = await axios.post(
        `http://localhost:5000/api/v1/chat`,
        {
          userId,
          message,
          characterId,
        },
        config
      );

      const { data } = response;
      console.log("API Response Data:", data);

      if (data && data.response) {
        console.log("Dispatching AI message...");
        dispatch(
          addCharacterMessage({
            characterId,
            message: {
              userId: selectedCharacter._id, // Ensure this is the character's ID
              message: data.response,
              timestamp: data.timestamp || new Date().toISOString(),
            },
          })
        );
      } else {
        console.error("API response does not contain expected data.");
      }

      return response;
    } catch (error) {
      console.error("Error in chat API call:", error.message);
      throw error; // Optionally rethrow to let calling function handle it
    }
  };

  return sendMessage;
};
