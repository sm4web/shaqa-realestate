import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import sha2a from "../../app/api/sha2a";
import app from "../../pages/api/firebase";
import { setCredentials } from "../auth/authSlice";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const initialState = {
  error: null,
};

export const userGoogleAuth = createAsyncThunk(
  "auth/googleAuth",
  async (router, thunkAPI) => {
    return signInWithPopup(auth, provider)
      .then((result) => {
        const {
          user: { uid, displayName, phoneNumber, accessToken, photoURL, email },
        } = result;

        setDoc(doc(db, "users", user.uid), {
          uid,
          displayName,
          email,
        })
          .then((result) => {
            thunkAPI.dispatch(
              setCredentials({
                user: { uid, displayName, email, phoneNumber, photoURL },
                token: accessToken,
              })
            );
            // send results to the client after setting user column.
          })
          .catch((err) => {
            console.log(err);
          });

        // When successfully fetch the user data will redirect to home page
        router.push({
          pathname: "/",
        });

        // return user data to the reducer
        return null;
      })
      .catch((error) => {
        // handle error when happens
        return "Something went wrong! Check your credintials.";
      });
  }
);

export const googleAuthSlice = createSlice({
  name: "googleAuth",
  initialState,
  reducers: {},

  extraReducers: {
    [userGoogleAuth.fulfilled]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default googleAuthSlice.reducer;

export const getInitialState = googleAuthSlice.getInitialState();
