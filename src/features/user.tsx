/* import { createSlice } from "@reduxjs/toolkit";
const initialStateValue = { name: "", age: 0, email: "" };

export const userSlice = createSlice({
  name: "user",
  initialState: { value: initialStateValue },
  reducers: {
    login: (State, action) => {
      State.value = action.payload;
    },

    logOut: (state) => {
      state.value = initialStateValue;
    },
  },
});
export const { login, logOut } = userSlice.actions;
export default userSlice.reducer;
 */