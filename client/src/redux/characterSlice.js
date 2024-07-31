import { createSlice } from "@reduxjs/toolkit";

const characterSlice = createSlice({
  name: "character",
  initialState: {
    selectedUser: null,
    userCharacter: [],
    allCharacters: [],
    characterMessage: [],
  },
  reducers: {
    setSelectedCharacter: (state, action) => {
      state.selectedCharacter = action.payload;
    },
    setUserCharacter: (state, action) => {
      state.userCharacter = action.payload;
    },
    setAllCharacters: (state, action) => {
      state.allCharacters = action.payload; // Adding the reducer to handle all characters
    },
    setCharacterMessage: (state, action) => {
      state.characterMessage = action.payload; // Adding the reducer to handle all characters
    },
  },
});
export const {
  setSelectedCharacter,
  setUserCharacter,
  setCharacterMessage,
  setAllCharacters,
} = characterSlice.actions;
export default characterSlice.reducer;
