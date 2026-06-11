import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { post, get } from "../config/request";

/**
 * LOGIN
 */
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

/**
 * GET USER
 */
export const getUser = createAsyncThunk("auth/getUser", async (_, thunkAPI) => {
  try {
    const res = await get("/auth/user");
    return res;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err?.message);
  }
});

/**
 * SLICE
 */
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

  extraReducers: (builder) => {
    builder

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
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
