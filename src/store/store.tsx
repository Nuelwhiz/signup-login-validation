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
//import AuthSlice from "../authThunk/authSlice.tsx";

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

import storage from "redux-persist/lib/storage";

// 1. combine reducers
const rootReducer = combineReducers({
  auth: AuthSlice,
});

// 2. persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // only persist auth
};

// 3. persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// 5. persistor
export const persistor = persistStore(store);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;