import React, { createContext, useState, useContext, useEffect } from "react";


const CharacterContext = createContext();

export const useCharacter = () => useContext(CharacterContext);

export const CharacterProvider = ({ children }) => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [getCharacterState, setGetCharacterState] = useState([]);
  const [getAllCharacterState, setGetAllCharacterState] = useState([]);


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
