import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  authUser: JSON.parse(localStorage.getItem("authUser")) || null,
  currentUser: {
    _id: "",
    avatar: "",
    // other user fields
  },
};
const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      const { data } = action.payload; // Assuming token is in data property
      const { accessToken, ...rest } = data; // Extract accessToken
      state.authUser = rest; // Store remaining user data in authUser
      localStorage.setItem("authUser", JSON.stringify(rest));
      localStorage.setItem("authToken", accessToken); // Store token separately
    },
    clearAuthUser: (state) => {
      state.authUser = null;
      localStorage.removeItem("authUser");
      localStorage.removeItem("accessToken");
    },
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});
export const { setAuthUser, clearAuthUser, setUser } = userSlice.actions;
export default userSlice.reducer;
