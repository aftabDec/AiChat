import React, { createContext, useState, useContext, useEffect } from "react";
import { getCharacter } from "../hooks/ChracterHook/getCharacter";
import { characterById } from "../hooks/ChracterHook/characterProfile";
import { getAllCharacters } from "../hooks/ChracterHook/getAllcharacter";

const CharacterContext = createContext();

export const useCharacter = () => useContext(CharacterContext);

export const CharacterProvider = ({ children }) => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [getCharacterState, setGetCharacterState] = useState([]);
  const [getAllCharacterState, setGetAllCharacterState] = useState([]);

  useEffect(() => {
    const fetchCharacterById = async (characterId) => {
      try {
        const response = await characterById(characterId);
        console.log("Full response from fetchCharacterById:", response);
        if (response.success) {
          setSelectedCharacter(response.data);
        } else {
          console.error("Error fetching character by ID:", response.message);
        }
      } catch (error) {
        console.error("Error fetching character by ID:", error.message);
      }
    };

    fetchCharacterById();
  }, []);

  useEffect(() => {
    const fetchUserCharacters = async () => {
      try {
        const response = await getCharacter();
        if (response.success) {
          setGetCharacterState(response.data);
        } else {
          console.error("Error fetching user characters:", response.message);
        }
      } catch (error) {
        console.error("Error fetching user characters:", error.message);
      }
    };

    fetchUserCharacters();
  }, []);

  useEffect(() => {
    const fetchAllCharacters = async () => {
      const response = await getAllCharacters();

      if (response.success) {
        setGetAllCharacterState(response.data);
      } else {
        console.error("Error fetching all characters:", response.message);
      }
    };

    fetchAllCharacters();
  }, []);

  return (
    <CharacterContext.Provider
      value={{
        selectedCharacter,
        setSelectedCharacter,
        getCharacterState,
        setGetCharacterState,
        getAllCharacterState,
        setGetAllCharacterState,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};
