import { createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../services/authservices";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data: any, thunkAPI) => {
    try {
      return await authService.register(data);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err?.message || "Registration failed");
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data: { email: string; password: string }, thunkAPI) => {
    try {
      return await authService.login(data);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err?.message || "Invalid email or password",
      );
    }
  },
);

export const getUser = createAsyncThunk("auth/getUser", async (_, thunkAPI) => {
  try {
    return await authService.getUser();
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err?.message);
  }
});

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (data: { email: string }, thunkAPI) => {
    try {
      return await authService.forgotPassword(data);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err?.message);
    }
  },
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data: { password: string; token: string }, thunkAPI) => {
    try {
      return await authService.resetPassword(data);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err?.message);
    }
  },
);
