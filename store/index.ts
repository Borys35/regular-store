import {
  configureStore,
  PreloadedState,
  StateFromReducersMapObject,
} from "@reduxjs/toolkit";
import categoriesReducer from "./slices/categories-slice";
import merchantReducer from "./slices/merchant-slice";

const reducer = {
  merchant: merchantReducer,
  categories: categoriesReducer,
};

export const createStore = (preloadedState: PreloadedState<RootState>) => {
  return configureStore({
    preloadedState,
    reducer,
  });
};

type Store = ReturnType<typeof createStore>;
export type RootState = StateFromReducersMapObject<typeof reducer>;
export type AppDispatch = Store["dispatch"];
