import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import sha2a from "../../app/api/sha2a";
import { setCredentials } from "../auth/authSlice";

const initialState = {
  error: null,
};

export const loginWithEmailAndPassword = createAsyncThunk(
  "auth/login",
  async (values, thunkAPI) => {
    const { email, password, router } = values;
    try {
      const { data } = await sha2a.post("/login", { email, password });

      thunkAPI.dispatch(setCredentials(data));

      router.push({
        pathname: "/",
      });

      return null;
    } catch (err) {
      console.log(err);
      return "User not found!";
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: {
    [loginWithEmailAndPassword.fulfilled]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default loginSlice.reducer;

export const getInitialState = loginSlice.getInitialState();
