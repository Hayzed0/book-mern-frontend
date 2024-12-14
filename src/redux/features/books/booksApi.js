import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../../utils/baseUrl'


const baseQuery =fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/books`,
    credentials: 'include',
    prepareHeaders: (Headers) => {
        const token = localStorage.getItem('token')
        if(token){
            Headers.set('Authorization', `Bearer ${token}`)
        }
        return Headers
    }
})


const booksApi = createApi({
     
    baseQuery,
    tagTypes: ["Books"],
    endpoints: (builder) => ({
        fetchAllBooks: builder.query({
            query: () => "/",
            providesTags: ["Books"]
        }),
        fetchBookById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{type: "Books", id}]
        }), 
        addBook: builder.mutation({
            query: (newBook) => ({
                url: `/create-book`,
                method: "POST",
                body: newBook,
            }),
            invalidatesTags: ["Books"]
        }),
        updateBooks:  builder.mutation({
            query: ({id, ...rest}) => ({
                url: `/edit/${id}`,
                method: "PUT",
                body: rest,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ["Books"]
        }),
        deleteBooks:  builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
                
            }),
            invalidatesTags: ["Books"]
        }),
        }),
})

export const {useFetchAllBooksQuery, useFetchBookByIdQuery, useAddBookMutation, useDeleteBooksMutation, useUpdateBooksMutation} = booksApi

export default booksApi