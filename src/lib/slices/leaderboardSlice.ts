import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { LeaderboardState, UserScore } from "../../types/leaderboard";
import { RootState } from "../store";

const initialState: LeaderboardState = {
  leaderboard: [],
  loading: false,
};

export const getLeaderboard = createAsyncThunk(
  "leaderboard/getLeaderboard",
  async (_, thunkApi) => {
    const token = (thunkApi.getState() as RootState).auth.token;
    const response = await axios.get<{ data: UserScore[] }>("/api/user-score", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  }
);

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLeaderboard.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getLeaderboard.fulfilled, (state, action) => {
      state.loading = false;
      state.leaderboard = action.payload.data;
    });
    builder.addCase(getLeaderboard.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default leaderboardSlice.reducer;

export const leaderboardSelector = (state: RootState) => state.leaderboard;
