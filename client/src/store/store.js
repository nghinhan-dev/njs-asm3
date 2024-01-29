import { configureStore } from "@reduxjs/toolkit";
import { userApi, orderApi } from "./services";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, orderApi.middleware),
});
