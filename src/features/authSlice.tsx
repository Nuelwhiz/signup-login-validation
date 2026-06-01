import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//
// ✅ LOGIN RESPONSE TYPE (keep here for now to reduce confusion)
//
type LoginResponse = {
  user: {
    id: string;
    email: string;
    name?: string;
  };
  auth?: {
    token: string;
  };
};

//
// ✅ LOGIN REQUEST TYPE
//
type LoginRequest = {
  email: string;
  password: string;
};

//
// ✅ ASYNC LOGIN
//
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

//
// ✅ SLICE
//
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null as LoginResponse["user"] | null,
    auth: null as LoginResponse["auth"] | null,
    loading: false,
    error: null as string | null,
  },

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
