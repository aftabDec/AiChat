import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCharacterMessage } from "../../redux/characterSlice";

export const useCharacterChatHook = () => {
  const selectedCharacter = useSelector(
    (store) => store.char.selectedCharacter
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCharacterMessage = async () => {
      try {
        // Ensure that selectedCharacter exists and has an _id before making the API call
        if (selectedCharacter?._id) {
          console.log(
            `Fetching messages for character ID: ${selectedCharacter._id}`
          );

          const response = await axios.post(
            `http://localhost:5000/api/v1/chat/${selectedCharacter?._id}`
          );
          console.log(response);
          console.log(response.data, "from selectedChar");

          // Dispatch the messages to the Redux store
          dispatch(setCharacterMessage([response.data])); // Dispatching only the messages part
        } else {
          console.log("No character selected");
        }
      } catch (error) {
        console.error("Error in chat API call:", error.message);
      }
    };

    fetchCharacterMessage();
  }, [selectedCharacter, dispatch]);

  // You might not need to return anything if you're only dispatching data
};
