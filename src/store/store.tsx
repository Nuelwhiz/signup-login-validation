/* 
import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../authThunk/authSlice.tsx";

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
     user: userSlice.reducer,
    theme: themeSlice.reducer,  
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
 

 */

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../authThunk/authSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "../utils/storage";
// Root reducer
const rootReducer = combineReducers({
  auth: authReducer,
});
// Persist config (ONLY auth for now)
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store
export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
