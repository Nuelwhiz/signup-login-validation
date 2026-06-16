import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./authInitial";

import {
  registerUser,
  loginUser,
  getUser,
  forgotPassword,
  resetPassword,
} from "./authThunk";

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        const payload = action.payload;

        state.loading = false;
        state.user = payload?.user;
        state.token = payload?.token;

        if (payload?.token) {
          localStorage.setItem("token", payload.token);
        }

        if (payload?.user) {
          localStorage.setItem("user", JSON.stringify(payload.user));
        }
      })

      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload?.data?.user || action.payload?.user;
      })

      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
      })

      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })

      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
