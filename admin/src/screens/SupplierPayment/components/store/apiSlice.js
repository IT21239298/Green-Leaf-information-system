import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURI = "http://localhost:8082";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseURI }),
  endpoints: (builder) => ({
    //add supplier payment
    addpayment: builder.mutation({
      query: (initialpayment) => ({
        // post: 'http://localhost:8080/api/transaction'
        url: "/api/payment",
        method: "POST",
        body: initialpayment,
      }),
      invalidatesTags: ["payment"],
    }),

    getpayment: builder.query({
      // get: 'http://localhost:8080/api/labels'
      query: () => "/api/payment",
      providesTags: ["payment"],
    }),
    deletepayment: builder.mutation({
      query: (recordId) => ({
        // delete:'http://localhost:8082/api/machine'
        url: "/api/payment",
        method: "DELETE",
        body: recordId,
      }),
      invalidatesTags: ["payment"],
    }),

    // update payment
    editpayment: builder.mutation({
      query: (recordId) => ({
        // put: `http://localhost:8083/api/machine/${updatedMachine.id}`
        url: `/api/payment/${recordId._id}`,
        method: "PUT",
        body: { recordId }, // Pass the updated properties in the body
      }),
      invalidatesTags: ["payment"],
    }),

    //add supplier payment
    addsupplierF: builder.mutation({
      query: (initialsupplierF) => ({
        // post: 'http://localhost:8080/api/transaction'
        url: "/api/supplierF",
        method: "POST",
        body: initialsupplierF,
      }),
      invalidatesTags: ["supplierF"],
    }),
  }),
});

export default apiSlice;
