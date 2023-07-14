import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURI = "http://localhost:8082";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseURI }),
  endpoints: (builder) => ({
    // register supplier
    addSupplier: builder.mutation({
      query: (initialSupplier) => ({
        url: "/api/supplier",
        method: "POST",
        body: initialSupplier,
      }),
      invalidatesTags: ["supplier"],
    }),
    //get supplier
    getSupplier: builder.query({
      // get: 'http://localhost:8000/api/supplier'
      query: () => "/api/supplier",
      providesTags: ["supplier"],
    }),

    // delete supplier details

    deleteSupplier: builder.mutation({
      query: (recordId) => ({
        // delete:'http://localhost:8000/api/supplier'
        url: "/api/supplier",
        method: "DELETE",
        body: recordId,
      }),
      invalidatesTags: ["supplier"],
    }),
    // update Supplier
    editSupplier: builder.mutation({
      query: (recordId) => ({
        // put: `http://localhost:8082/api/supplier/${updatedSupplier.id}`
        url: `/api/supplier/${recordId._id}`,
        method: "PUT",
        body: { recordId }, // Pass the updated properties in the body
      }),
      invalidatesTags: ["supplier"],
    }),
    // update quantity
    editQuantity: builder.mutation({
      query: (recordId) => ({
        // put: `http://localhost:8082/api/quantity/${updatedQuantity.id}`
        url: `/api/quantity/${recordId._id}`,
        method: "PUT",
        body: { recordId }, // Pass the updated properties in the body
      }),
      invalidatesTags: ["quantity"],
    }),

    //add Quantity details
    addQuantity: builder.mutation({
      query: (initialQuantity) => ({
        url: "/api/quantity",
        method: "POST",
        body: initialQuantity,
      }),
      invalidatesTags: ["quantity"],
    }),

    //get quantity
    getQuantity: builder.query({
      // get: 'http://localhost:8000/api/quantity'
      query: () => "/api/quantity",
      providesTags: ["quantity"],
    }),

    // delete Quantity details

    deleteQuantity: builder.mutation({
      query: (recordId) => ({
        // delete:'http://localhost:8000/api/quantity'
        url: "/api/quantity",
        method: "DELETE",
        body: recordId,
      }),
      invalidatesTags: ["quantity"],
    }),

    // supplier qunatity
    addSupplierQuantity: builder.mutation({
      query: (initialSupplier) => ({
        url: "/api/supplierquantity",
        method: "POST",
        body: initialSupplier,
      }),
      invalidatesTags: ["supplierquantity"],
    }),

    //get supplier quantity
    getSupplierQuantity: builder.query({
      // get: 'http://localhost:8000/api/supplier'
      query: () => "/api/supplierquantity",
      providesTags: ["supplierquantity"],
    }),
  }),
});

export default apiSlice;
