import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { userSlice } from "./features/user.tsx";
import Profile from "./profile-log/profile.tsx";
import Logs from "./profile-log/logs.tsx";

/* interface user{
  name:string
} */
//let user: any;
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      {/*  <App /> */}
      <Profile />
      <Logs />
    </Provider>
  </StrictMode>,
);
