import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/user/",
  }),
  tagTypes: ["Item"],
  endpoints: (builder) => ({
    // GET cart
    getCart: builder.query({
      query: () => ({
        url: "cart",
        credentials: "include",
      }),
      // eslint-disable-next-line no-unused-vars
      providesTags: (result = [], error, arg) => {
        return [
          "Item",
          ...result.items.map(({ id }) => ({ type: "Item", id: id })),
        ];
      },
    }),
    // GET single item
    getCartItem: builder.query({
      query: (id) => ({
        url: `cart/${id}`,
        credentials: "include",
      }),
      providesTags: (result, error, arg) => {
        console.log(result);
        return [{ type: "Item", id: arg }];
      },
    }),
    // PATCH update cart's item
    updateCart: builder.mutation({
      query: (body) => ({
        url: "cart",
        method: "PATCH",
        body,
        credentials: "include",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Item", id: arg.id }],
    }),
  }),
});

export const { useGetCartQuery, useGetCartItemQuery, useUpdateCartMutation } =
  userApi;
