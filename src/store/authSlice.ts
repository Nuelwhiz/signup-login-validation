import { createSlice } from "@reduxjs/toolkit";

import { get, post, patch, pop } from "../config/request"
import type { RootState } from "./store";


/* 
const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;

      localStorage.removeItem("token");
    },
  },

  extraReducers: (builder) => {
    builder */

      // LOGIN
      /* .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, { payload }: any) => {
        state.loading = false;
        state.user = payload?.data?.user;
        state.token = payload?.data?.auth?.access_token;
        state.isAuthenticated = true;

        localStorage.setItem("token", payload?.data?.auth?.access_token);
      })

      .addCase(login.rejected, (state, { payload }: any) => {
        state.loading = false;
        state.error = payload;
      }) */

      // REGISTER
      /* .addCase(register.pending, (state) => {
        state.loading = true;
      })

      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(register.rejected, (state, { payload }: any) => {
        state.loading = false;
        state.error = payload;
      }) */

      // FORGOT PASSWORD
     /*  .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
      })

      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(forgotPassword.rejected, (state, { payload }: any) => {
        state.loading = false;
        state.error = payload;
      }) */

      // RESET PASSWORD
      /* .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })

      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(resetPassword.rejected, (state, { payload }: any) => {
        state.loading = false;
        state.error = payload;
      })

      // GET USER
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(getUser.fulfilled, (state, { payload }: any) => {
        state.loading = false;
        state.user = payload?.data;
      })

      .addCase(getUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer; */

//

/* import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  user: any;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
 */
