import { createSlice } from "@reduxjs/toolkit";
import { destroyCookie } from "nookies";

const initialState = {
  isLoggedIn: false,
  userData: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoginData: (state, { payload }) => {
      state.userData = payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userData = null;

      window.location.href = "/login";
      destroyCookie(null, "user", { path: "/" });
    },
  },
});

export const { setLoginData, logout } = userSlice.actions;
export default userSlice.reducer;
