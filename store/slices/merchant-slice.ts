import { Merchant } from "@chec/commerce.js/types/merchant";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const merchantSlice = createSlice({
  name: "merchant",
  initialState: {} as Merchant,
  reducers: {
    setMerchant: (state, action: PayloadAction<Merchant>) => {
      state = action.payload;
    },
  },
});

export const { setMerchant } = merchantSlice.actions;

export default merchantSlice.reducer;
