import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./authSlice.tsx";

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    /*   user: userSlice.reducer,
    theme: themeSlice.reducer, */
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
