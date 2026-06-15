import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.tsx";

//import { PersistGate } from "redux-persist/integration/react";
//import { userSlice } from "./features/user.tsx";
//import { themeSlice } from "./features/theme.tsx";
/* import Profile from "./profile-log/profile.tsx";
import Logs from "./profile-log/logs.tsx";
import Color from "./profile-log/color.tsx";
import { User } from "lucide-react"; */
{
  /* <Profile />
      <Logs />
      <Color /> */
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
