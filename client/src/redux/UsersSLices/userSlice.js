import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  authUser: JSON.parse(localStorage.getItem("authUser")) || null,
};
const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
      localStorage.setItem("authUser", JSON.stringify(action.payload));
    },
    clearAuthUser: (state) => {
      state.authUser = null;
      localStorage.removeItem("authUser");
    },
  },
});
export const { setAuthUser, clearAuthUser } = userSlice.actions;
export default userSlice.reducer;
