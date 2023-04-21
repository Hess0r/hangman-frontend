import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import adminSlice from "./slices/adminSlice";
import authReducer from "./slices/authSlice";
import gameSlice from "./slices/gameSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    game: gameSlice,
    admin: adminSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
