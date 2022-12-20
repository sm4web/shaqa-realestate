import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from "../../firebase";

const initialState = {
  data: {
    user: null,
    token: null,
    error: null,
  },
};

export const userGoogleAuth = createAsyncThunk("auth/login", async (router) => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  return signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;

      // When successfully fetch the user data will redirect to home page
      router.push({
        pathname: "/",
      });

      // return user data to the reducer
      return {
        user,
        token: user.accessToken,
        error: null,
      };
    })
    .catch((error) => {
      // handle error when happens
      const errorMessage = error.message;
      return { user: null, token: null, error: errorMessage };
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
      state.data.user = null;
      state.data.token = null;
    },
  },

  extraReducers: {
    [userGoogleAuth.fulfilled]: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

export const getInitialState = authSlice.getInitialState();

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
