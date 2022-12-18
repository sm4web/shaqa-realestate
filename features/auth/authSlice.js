import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  token: null,
};

export const userLogin = createAsyncThunk("auth/login", async (values) => {
  return axios
    .post("api/token/", values)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return { errorMessage: error.response.data.error };
    });
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state, action) => {
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: {},
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

export const getInitialState = authSlice.getInitialState();
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
