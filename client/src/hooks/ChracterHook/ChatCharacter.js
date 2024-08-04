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
      const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const userId = authUser.user._id;

      console.log("Dispatching user message...");
      dispatch(
        addCharacterMessage({
          characterId: selectedCharacter._id,
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
          characterId: selectedCharacter._id,
        },
        config
      );

      const { data } = response;
      console.log("API Response Data:", data);

      console.log("Dispatching AI message...");
      dispatch(
        addCharacterMessage({
          characterId: selectedCharacter._id,
          message: {
            userId: selectedCharacter._id,
            message: data.response,
            timestamp: data.timestamp || new Date().toISOString(),
          },
        })
      );

      return response;
    } catch (error) {
      console.error("Error in chat API call:", error.message);
    }
  };

  return sendMessage;
};
