import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { Game, GameDifficulty, GameState } from "../../types/game";
import { RootState } from "../store";

const initialState: GameState = {
  game: null,
  loading: false,
  status: "init",
};

export const fetchCurentGame = createAsyncThunk(
  "game/fetchCurrentGame",
  async (_) => {
    const response = await axios.get<{ data: Game }>("/api/game");

    return response.data;
  }
);

export const createGame = createAsyncThunk(
  "game/createGame",
  async (difficulty: GameDifficulty, thunkApi) => {
    try {
      const response = await axios.post<{ data: Game }>("/api/game", {
        difficulty,
      });

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

export const guessLetter = createAsyncThunk(
  "game/guessLetter",
  async (letter: string) => {
    const response = await axios.put<{ data: Game }>("/api/game", { letter });

    return response.data;
  }
);

export const endGame = createAsyncThunk("game/endGame", async (_) => {
  const response = await axios.delete("/api/game");

  return response.data;
});

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    clearState: (state) => {
      state.loading = false;
      state.game = null;
      state.status = "init";
    },
  },
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

    builder.addCase(guessLetter.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(guessLetter.fulfilled, (state, action) => {
      state.loading = false;
      state.game = action.payload.data;
    });
    builder.addCase(guessLetter.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(endGame.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(endGame.fulfilled, (state) => {
      state.loading = false;
      state.game = null;
      state.status = "not_found";
    });
    builder.addCase(endGame.rejected, (state) => {
      state.loading = false;
      state.game = null;
      state.status = "not_found";
    });
  },
});

export default gameSlice.reducer;

export const gameActions = gameSlice.actions;

export const gameSelector = (state: RootState) => state.game;
