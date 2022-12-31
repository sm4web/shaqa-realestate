import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import sha2a from "../../app/api/sha2a";

const initialState = {
  error: null,
};

export const updateUserData = createAsyncThunk("auth/user", async (values) => {
  const { data, uid } = values;

  try {
    const result = await sha2a.post("/update-user", { data, uid });
    return null;
  } catch (error) {
    return error.message;
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [updateUserData.fulfilled]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default userSlice.reducer;

export const getInitialState = userSlice.getInitialState();
