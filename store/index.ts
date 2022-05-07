import {
  configureStore,
  PreloadedState,
  StateFromReducersMapObject,
} from "@reduxjs/toolkit";
import { cartApi } from "./apis/cart";
import categoriesReducer from "./slices/categories-slice";
import merchantReducer from "./slices/merchant-slice";

const reducer = {
  merchant: merchantReducer,
  categories: categoriesReducer,
  [cartApi.reducerPath]: cartApi.reducer,
};

export const createStore = (
  preloadedState: PreloadedState<Omit<RootState, "cartApi">>
) => {
  return configureStore({
    preloadedState,
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(cartApi.middleware),
  });
};

type Store = ReturnType<typeof createStore>;
export type RootState = StateFromReducersMapObject<typeof reducer>;
export type AppDispatch = Store["dispatch"];
