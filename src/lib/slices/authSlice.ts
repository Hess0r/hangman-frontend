import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type {
  AuthState,
  Credentials,
  GetUserResponse,
  LoginResponse,
  User,
} from "../../types/auth";
import { RootState } from "../store";

const storageKey = "auth-token";

const initialState: AuthState = {
  status: "init",
  loading: false,
  user: null,
  token: localStorage.getItem(storageKey),
};

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, thunkApi) => {
    const token = (thunkApi.getState() as RootState).auth.token;
    const response = await axios.get<User>("/api/auth/user", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (creadentials: Credentials) => {
    const resposnse = await axios.post<LoginResponse>(
      "/api/auth/login",
      creadentials
    );

    return resposnse.data;
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkApi) => {
  const token = (thunkApi.getState() as RootState).auth.token;
  const resposnse = await axios.post("/api/auth/logout", null, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return resposnse.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.status = "authenticated";
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(fetchUser.rejected, (state) => {
      state.status = "unauthenticated";
      state.loading = false;
      state.user = null;
      state.token = null;
    });

    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      localStorage.setItem(storageKey, action.payload.token);
      state.token = action.payload.token;
      state.loading = false;
    });
    builder.addCase(login.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(logout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false;
      localStorage.removeItem(storageKey);
      state.token = null;
      state.status = "unauthenticated";
      state.user = null;
    });
    builder.addCase(logout.rejected, (state) => {
      state.loading = false;
      localStorage.removeItem(storageKey);
      state.token = null;
      state.status = "unauthenticated";
      state.user = null;
    });
  },
});

export default authSlice.reducer;

export const authSelector = (state: RootState) => state.auth;
