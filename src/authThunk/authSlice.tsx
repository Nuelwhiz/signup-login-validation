import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { post, get } from "../config/request";

// =======================
// REGISTER
// =======================
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    data: {
      fullname: string;
      email: string;
      country: string;
      phone: string;
      password: string;
    },
    thunkAPI,
  ) => {
    try {
      const res = await post("/auth/sign-up", data);
      return res; // backend already returns clean data from your request wrapper
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message ||
          err?.message ||
          "Registration failed",
      );
    }
  },
);

// =======================
// LOGIN
// =======================
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    data: { email: string; password: string },
    thunkAPI,
  ) => {
    try {
      const res = await post("/auth/sign-in", data);

      // assuming API returns: { user, token }
      return res;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message ||
          err?.message ||
          "Invalid email or password",
      );
    }
  },
);

// =======================
// GET USER
// =======================
export const getUser = createAsyncThunk(
  "auth/getUser",
  async (_, thunkAPI) => {
    try {
      const res = await get("/auth/user");
      return res;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || err?.message,
      );
    }
  },
);

// =======================
// FORGOT PASSWORD
// =======================
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (data: { email: string }, thunkAPI) => {
    try {
      const res = await post("/auth/forgot-password", data);
      return res;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || err?.message,
      );
    }
  },
);

// =======================
// RESET PASSWORD
// =======================
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (
    data: { password: string; token: string },
    thunkAPI,
  ) => {
    try {
      const res = await post("/auth/reset-password", data);
      return res;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || err?.message,
      );
    }
  },
);

// =======================
// SLICE
// =======================
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    isLoading: false,
    error: null as string | null,
    isAuthenticated: false,
  },

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ===================
      // REGISTER
      // ===================
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // ===================
      // LOGIN
      // ===================
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;

        const payload = action.payload;

        state.user = payload?.user;
        state.token = payload?.token;
        state.isAuthenticated = !!payload?.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // ===================
      // GET USER
      // ===================
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload?.user || action.payload?.data?.user;
      })

      // ===================
      // FORGOT PASSWORD
      // ===================
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // ===================
      // RESET PASSWORD
      // ===================
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;