import React, { createContext, useState, useContext, useEffect } from "react";

const CharacterContext = createContext();

export const CharacterProvider = ({ children }) => {
  return (
    <CharacterContext.Provider value={{}}>{children}</CharacterContext.Provider>
  );
};
export const useCharacter = () => useContext(CharacterContext);
export default CharacterContext;
