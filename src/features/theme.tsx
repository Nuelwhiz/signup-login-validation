/* import { createSlice } from "@reduxjs/toolkit";
const initialStateValue = "";

export const themeSlice = createSlice({
  name: "theme",
  initialState: { value: initialStateValue },
  reducers: {
    themeChanger: (State, action) => {
      State.value = action.payload;
    },
  },
});
export const { themeChanger } = themeSlice.actions;
export default themeSlice.reducer;
 */

import { createSlice } from "@reduxjs/toolkit";
const initialStateValue = "";

export const themeSlice = createSlice({
  name: "theme",
  initialState: { value: initialStateValue },
  reducers: {
    themeChanger: (State, action) => {
      State.value = action.payload;
    },
  },
  
});
export const { themeChanger } = themeSlice.actions;
export default themeSlice.reducer;
