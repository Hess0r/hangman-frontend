import axios from "axios";
import { authActions } from "./slices/authSlice";
import type Store from "./store";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export function setupAxios(store: typeof Store) {
  axios.interceptors.request.use((config) => {
    const token = store.getState().auth.token;

    if (!!token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  axios.interceptors.response.use(null, (error) => {
    if (axios.isAxiosError(error) && error.response) {
      if (
        error.response.status === 401 &&
        store.getState().auth.status === "authenticated"
      ) {
        store.dispatch(authActions.logout());
      }
    }

    return Promise.reject(error);
  });
}
