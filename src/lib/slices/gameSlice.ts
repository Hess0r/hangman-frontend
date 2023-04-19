import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { Game, GameState } from "../../types/game";
import { RootState } from "../store";

const initialState: GameState = {
  game: null,
  loading: false,
  status: "init",
};

export const fetchCurentGame = createAsyncThunk(
  "game/fetchCurrentGame",
  async (_, thunkApi) => {
    const token = (thunkApi.getState() as RootState).auth.token;
    const response = await axios.get<{ data: Game }>("/api/game", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  }
);

export const createGame = createAsyncThunk(
  "game/createGame",
  async (difficulty: string, thunkApi) => {
    const token = (thunkApi.getState() as RootState).auth.token;
    const response = await axios.post<{data: Game}>(
      "/api/game",
      { difficulty },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  }
);

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCurentGame.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCurentGame.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "found";
      state.game = action.payload.data;
    });
    builder.addCase(fetchCurentGame.rejected, (state) => {
      state.loading = false;
      state.game = null;
      state.status = "not_found";
    });

    builder.addCase(createGame.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createGame.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "found";
      state.game = action.payload.data;
    });
    builder.addCase(createGame.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default gameSlice.reducer;

export const gameSelector = (state: RootState) => state.game;
