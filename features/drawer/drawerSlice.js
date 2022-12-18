import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  opened: false,
};

export const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    toggleDrawer: (state, action) => {
      state.opened = !state.opened;
    },
  },
});

export const { toggleDrawer } = drawerSlice.actions;

export default drawerSlice.reducer;
