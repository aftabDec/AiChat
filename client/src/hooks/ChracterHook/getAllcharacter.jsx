import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllCharacters } from "../../redux/characterSlice";

export const useGetAllCharacterHook = () => {
  const allCharacters = useSelector((store) => store.char.allCharacters);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllUsersCharacters = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/character/get`
        );
        dispatch(setAllCharacters(response.data.data));
      } catch (error) {
        console.error("Error in API call:", error.message);
      }
    };
    fetchAllUsersCharacters();
  }, [dispatch]);
  return allCharacters;
};
