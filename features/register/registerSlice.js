import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import sha2a from "../../app/api/sha2a";
import { setCredentials } from "../auth/authSlice";

const initialState = {
  error: null,
};

export const registerWithEmailAndPassword = createAsyncThunk(
  "auth/register",
  async (values, thunkAPI) => {
    const { email, password, fullName, router } = values;

    try {
      const { data } = await sha2a.post("/register", {
        email,
        password,
        fullName,
      });

      thunkAPI.dispatch(setCredentials(data));

      router.push({
        pathname: "/profile-setup",
        query: {
          step: 2,
        },
      });

      return null;
    } catch (error) {
      return error.message;
    }
  }
);

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: {
    [registerWithEmailAndPassword.fulfilled]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default registerSlice.reducer;

export const getInitialState = registerSlice.getInitialState();
