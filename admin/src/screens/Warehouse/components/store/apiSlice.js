import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURI = "http://localhost:8082";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseURI }),
  endpoints: (builder) => ({
    // get categories
    getCategories: builder.query({
      // get: 'http://localhost:8081/api/categories'
      query: () => "/api/categories",
      providesTags: ["categories"],
    }),
    //add transaction
    addTransaction: builder.mutation({
      query: (initialTransaction) => ({
        // post: 'http://localhost:8080/api/transaction'
        url: "/api/transaction",
        method: "POST",
        body: initialTransaction,
      }),
      invalidatesTags: ["transaction"],
    }),

    // get labels
    getLabels: builder.query({
      // get: 'http://localhost:8080/api/labels'
      query: () => "/api/transaction",
      providesTags: ["transaction"],
    }),

    // delete record
    deleteTransaction: builder.mutation({
      query: (recordId) => ({
        // delete: 'http://localhost:8080/api/transaction'
        url: "/api/transaction",
        method: "DELETE",
        body: recordId,
      }),
      invalidatesTags: ["transaction"],
    }),

    // add new machine
    addMachinep: builder.mutation({
      query: (initialMachinep) => ({
        // post: 'http://localhost:8082/api/machinep'
        url: "/api/machinep",
        method: "POST",
        body: initialMachinep,
      }),
      invalidatesTags: ["machinep"],
    }),
    //get machine
    getMachinep: builder.query({
      // get: 'http://localhost:8082/api/machine'
      query: () => "/api/machinep",
      providesTags: ["machinep"],
    }),
    // delete machine details

    deleteMachinep: builder.mutation({
      query: (recordId) => ({
        // delete:'http://localhost:8082/api/machine'
        url: "/api/machinep",
        method: "DELETE",
        body: recordId,
      }),
      invalidatesTags: ["machinep"],
    }),

    // update machine
    editMachinep: builder.mutation({
      query: (recordId) => ({
        // put: `http://localhost:8082/api/machinep/${updatedMachine.id}`
        url: `/api/machinep/${recordId._id}`,
        method: "PUT",
        body: { recordId }, // Pass the updated properties in the body
      }),
      invalidatesTags: ["machinep"],
    }),

    //__________________________________________________
    // get matirialcategories
    getMatirialCategories: builder.query({
      // get: 'http://localhost:8081/api/matirialcategories'
      query: () => "/api/ matirialcategories",
      providesTags: [" matirialcategories"],
    }),
    // get matiriallabels
    getMatirialLabels: builder.query({
      // get: 'http://localhost:8080/api/labels'
      query: () => "/api/matirial",
      providesTags: ["matirial"],
    }),
    //add packing matirial
    addMatirial: builder.mutation({
      query: (initialMatirial) => ({
        // post: 'http://localhost:8080/api/transaction'
        url: "/api/matirial",
        method: "POST",
        body: initialMatirial,
      }),
      invalidatesTags: ["matirial"],
    }),

    deleteMatirial: builder.mutation({
      query: (recordId) => ({
        // delete: 'http://localhost:8080/api/transaction'
        url: "/api/matirial",
        method: "DELETE",
        body: recordId,
      }),
      invalidatesTags: ["matirial"],
    }),
    //_____________________________________________
    //add product
    addProduct: builder.mutation({
      query: (initialProduct) => ({
        // post: 'http://localhost:8080/api/transaction'
        url: "/api/product",
        method: "POST",
        body: initialProduct,
      }),
      invalidatesTags: ["product"],
    }),
    // get productcategories
    getProductCategories: builder.query({
      // get: 'http://localhost:8081/api/productcategories'
      query: () => "/api/productcategories",
      providesTags: ["productcategories"],
    }),
    // get matiriallabels
    getProductLabels: builder.query({
      // get: 'http://localhost:8080/api/labels'
      query: () => "/api/product",
      providesTags: ["product"],
    }),
    deleteProduct: builder.mutation({
      query: (recordId) => ({
        // delete: 'http://localhost:8080/api/transaction'
        url: "/api/product",
        method: "DELETE",
        body: recordId,
      }),
      invalidatesTags: ["product"],
    }),
    // update product
    editProduct: builder.mutation({
      query: (recordId) => ({
        // put: `http://localhost:8082/api/product/${updateProduct.id}`
        url: `/api/product/${recordId._id}`,
        method: "PUT",
        body: { recordId }, // Pass the updated properties in the body
      }),
      invalidatesTags: ["product"],
    }),
    //update matirial
    editMatirial: builder.mutation({
      query: (recordId) => ({
        // put: `http://localhost:8082/api/product/${updateProduct.id}`
        url: `/api/matirial/${recordId._id}`,
        method: "PUT",
        body: { recordId }, // Pass the updated properties in the body
      }),
      invalidatesTags: ["matirial"],
    }),

    realeseMatirial: builder.mutation({
      query: (recordId) => ({
        // put: `http://localhost:8082/api/product/${updateProduct.id}`
        url: `/api/matirial/${recordId._id}`,
        method: "PUT",
        body: { recordId }, // Pass the updated properties in the body
      }),
      invalidatesTags: ["matirial"],
    }),
  }),
});

export default apiSlice;
