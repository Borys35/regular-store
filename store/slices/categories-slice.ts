import { Category } from "@chec/commerce.js/types/category";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: [] as Category[],
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state = action.payload;
    },
  },
});

export const { setCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
