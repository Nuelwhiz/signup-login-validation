import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { post, get } from "../config/request";

//register
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
      return res?.data || res;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err?.message || "Registration failed");
    }
  },
);

//login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await post("/auth/sign-in", data);

      const payload = res?.data || res;

      const token = payload?.token;
      const user = payload?.user;

      if (token) {
        localStorage.setItem("token", token);
      }

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      return payload;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err?.message || "Login failed");
    }
  },
);

//GET USER

export const getUser = createAsyncThunk("auth/getUser", async (_, thunkAPI) => {
  try {
    const res = await get("/auth/user");
    return res;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err?.message);
  }
});
//forgotpassword
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (data: { email: string }, thunkAPI) => {
    try {
      const res = await post("/auth/forgot-password", data);
      return res?.data || res;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err?.message || "Failed to send reset code",
      );
    }
  },
);

//resetpassword

//SLICE
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user") || "null"),
    token: localStorage.getItem("token") || null,
    isLoading: false,
    error: null as string | null,
    isAuthenticated: !!localStorage.getItem("token"),
  },

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },

  //

  extraReducers: (builder) => {
    builder

      // REGISTER
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

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;

        const payload = action.payload;

        state.user =
          payload?.user || JSON.parse(localStorage.getItem("user") || "null");

        state.token = payload?.token || localStorage.getItem("token");

        state.isAuthenticated = !!state.token;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // GET USER
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload?.data?.user || action.payload?.user;
        localStorage.setItem("user", JSON.stringify(state.user));
      })

      //forgotpassord
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
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
