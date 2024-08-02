import { createSlice } from "@reduxjs/toolkit";

const characterSlice = createSlice({
  name: "character",
  initialState: {
    selectedCharacter: null,
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
      state.allCharacters = action.payload;
    },
    setCharacterMessage: (state, action) => {
      state.characterMessage = action.payload;
    },
    addCharacterMessage: (state, action) => {
      if (Array.isArray(state.characterMessage)) {
        state.characterMessage.push(action.payload);
      } else {
        state.characterMessage = [action.payload]; // Ensure this is an array
      }
    },
  },
});

export const {
  setSelectedCharacter,
  setUserCharacter,
  setCharacterMessage,
  setAllCharacters,
  addCharacterMessage,
} = characterSlice.actions;

export default characterSlice.reducer;
