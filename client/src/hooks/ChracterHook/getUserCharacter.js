import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUserCharacter } from "../../redux/characterSlice";
export const getCharacter = async (userId) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/v1/character/user/${userId}`
    );
    return { success: true, data: response.data.data };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
export const useGetUserCharacterHook = () => {
  const { authUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUserCharacters = async () => {
      try {
        if (
          authUser &&
          authUser.data &&
          authUser.data.user &&
          authUser.data.user._id
        ) {
          axios.defaults.withCredentials = true;
          const response = await axios.get(
            `http://localhost:5000/api/v1/character/user/${authUser.data.user._id}`
          );
          console.log("Fetched user characters:", response.data);
          dispatch(setUserCharacter(response.data)); // Ensure to pass the correct data
        } else {
          console.error("User ID is missing or not authenticated.");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios error:", error.response?.data || error.message);
        } else {
          console.error("Unexpected error:", error);
        }
      }
    };
    fetchUserCharacters();
  }, [dispatch, authUser]);
};
{
  /*this hook is for to get a user created characters in there profile*/
}
