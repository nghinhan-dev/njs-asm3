import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/user/",
  }),
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => ({
        url: "cart",
        credentials: "include",
      }),
    }),
    updateCart: builder.mutation({
      query: (body) => ({
        url: "cart",
        method: "PUT",
        body,
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetCartQuery } = userApi;
