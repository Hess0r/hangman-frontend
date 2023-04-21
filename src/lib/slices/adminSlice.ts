import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { AdminState, Word } from "../../types/word";
import { RootState } from "../store";

const initialState: AdminState = {
  words: [],
  loading: false,
};

export const getWords = createAsyncThunk(
  "admin/getWords",
  async (_, thunkApi) => {
    const token = (thunkApi.getState() as RootState).auth.token;
    const response = await axios.get<{ data: Word[] }>("/api/words", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  }
);

export const createWord = createAsyncThunk(
  "admin/createWord",
  async (word: string, thunkApi) => {
    const token = (thunkApi.getState() as RootState).auth.token;
    try {
      const response = await axios.post<{ data: Word }>(
        "/api/words",
        { word },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        return thunkApi.rejectWithValue({
          status: err.response.status,
          data: err.response.data,
        });
      }

      throw err;
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWords.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getWords.fulfilled, (state, action) => {
      state.loading = false;
      state.words = action.payload.data;
    });
    builder.addCase(getWords.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default adminSlice.reducer;

export const adminSelector = (state: RootState) => state.admin;
