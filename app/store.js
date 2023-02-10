import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import drawerSlice from "../features/drawer/drawerSlice";

import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

import loginSlice from "../features/login/loginSlice";
import googleAuthSlice from "../features/googleAuth/googleAuthSlice";
import registerSlice from "../features/register/registerSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  drawer: drawerSlice,
  login: loginSlice,
  googleAuth: googleAuthSlice,
  register: registerSlice,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
