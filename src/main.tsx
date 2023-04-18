import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AuthInit from "./components/AuthInit";
import "./index.css";
import store from "./lib/store";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthInit>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthInit>
    </Provider>
  </React.StrictMode>
);
