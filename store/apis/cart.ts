import { Cart } from "@chec/commerce.js/types/cart";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { commerce } from "../../lib/commerce";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery(),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    retrieveCart: builder.query<Cart, void>({
      queryFn: async () => {
        const cart = await commerce.cart.retrieve();

        return {
          data: cart,
        };
      },
      providesTags: ["Cart"],
    }),
    addProduct: builder.mutation<
      Cart,
      { id: string; quantity?: number; variantData?: any }
    >({
      queryFn: async ({ id, quantity, variantData }) => {
        const { cart } = await commerce.cart.add(id, quantity, variantData);

        return { data: cart };
      },
      invalidatesTags: ["Cart"],
    }),
    emptyCart: builder.mutation<Cart, void>({
      queryFn: async () => {
        const { cart } = await commerce.cart.empty();

        return { data: cart };
      },
      invalidatesTags: ["Cart"],
    }),
    updateCart: builder.mutation<Cart, { lineId: string; quantity: number }>({
      queryFn: async ({ lineId, quantity }) => {
        const { cart } = await commerce.cart.update(lineId, { quantity });

        return { data: cart };
      },
      invalidatesTags: ["Cart"],
    }),
    removeFromCart: builder.mutation<Cart, string>({
      queryFn: async (lineId) => {
        const { cart } = await commerce.cart.remove(lineId);

        return { data: cart };
      },
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useRetrieveCartQuery,
  useAddProductMutation,
  useEmptyCartMutation,
  useUpdateCartMutation,
  useRemoveFromCartMutation,
} = cartApi;
