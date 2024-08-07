// store.js

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import { loadState, saveState } from "./localStorageUtils";

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState().cart);
});

export default store;
