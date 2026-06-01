import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// LOGIN RESPONSE TYPE
type LoginResponse = {
  user: {
    id: string;
    email: string;
    phone: string;
    country: string;
    name?: string;
  };
  auth?: {
    token: string;
  };
};

// LOGIN REQUEST TYPE
type LoginRequest = {
  email: string;
  password: string;
};

// 👇 READ SAVED DATA FROM LOCALSTORAGE
const savedUser = localStorage.getItem("user");
const savedAuth = localStorage.getItem("auth");

// 👇 INITIAL STATE
const initialState = {
  user: savedUser ? (JSON.parse(savedUser) as LoginResponse["user"]) : null,

  auth: savedAuth ? (JSON.parse(savedAuth) as LoginResponse["auth"]) : null,

  loading: false,
  error: null as string | null,
};

export const loginUser = createAsyncThunk<LoginResponse, LoginRequest>(
  "auth/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "https://api-coders.ipglobalreits.com/api/auth/sign-in",
        data,
      );

      const result = res.data.data;

      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("auth", JSON.stringify(result.auth));

      return result;
    } catch (err) {
      return rejectWithValue("Login failed");
    }
  },
);

const authSlice = createSlice({
  name: "auth",

  // 👇 USE THE NEW INITIAL STATE
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.auth = null;
      localStorage.removeItem("user");
      localStorage.removeItem("auth");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.auth = action.payload.auth;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
