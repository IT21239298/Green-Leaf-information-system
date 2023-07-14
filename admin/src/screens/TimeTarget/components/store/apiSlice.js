import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURI = "http://localhost:8082";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseURI }),
  endpoints: (builder) => ({
   
    // register target
 addTarget: builder.mutation({
      query: (initialTarget) => ({
        
        url: "/api/target",
        method: "POST",
        body: initialTarget,
      }),
      invalidatesTags: ["target"],
    }),
    //get target
    getTarget: builder.query({
      // get: 'http://localhost:8000/api/target'
      query: () => "/api/target",
      providesTags: ["target"],
    }),

 // delete target details

 deleteTarget: builder.mutation({
  query: (recordId) => ({
    // delete:'http://localhost:8000/api/target'
    url: "/api/target",
    method: "DELETE",
    body: recordId,
  }),
  invalidatesTags: ["target"],
}),
   // update target
   editTarget: builder.mutation({
    query: (recordId) => ({
      // put: `http://localhost:8082/api/machine/${updatedMachine.id}`
      url: `/api/target/${recordId._id}`,
      method: "PUT",
      body: { recordId }, // Pass the updated properties in the body
    }),
    invalidatesTags: ["target"],
  }),


    //add time details
    addTime: builder.mutation({
      query: (initialTime) => ({
        
        url: "/api/time",
        method: "POST",
        body: initialTime,
      }),
      invalidatesTags: ["time"],
    }),

   //get time
   getTime: builder.query({
      // get: 'http://localhost:8000/api/time'
    query: () => "/api/time",
    providesTags: ["time"],
  }),
   
 
  }),
});

export default apiSlice;