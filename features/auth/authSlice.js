import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    user: null,
    token: null,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.data.user = user;
      state.data.token = token;
    },
    logout: (state, action) => {
      state.data.user = null;
      state.data.token = null;
    },
  },

  extraReducers: {},
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

export const getInitialState = authSlice.getInitialState();

export const selectCurrentUser = (state) => state.auth?.data?.user;
export const selectCurrentToken = (state) => state.auth?.data?.token;
