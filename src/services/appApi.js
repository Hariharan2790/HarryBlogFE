
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const appApi = createApi({
    reducerPath: 'appApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "https://harrymernblog.herokuapp.com/",
        prepareHeaders: (headers, { getState }) => {
            const token = getState().user.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),

    endpoints: (builder) => ({
        signupUser: builder.mutation({
            query: (user) => ({
                url: "/users/register",
                method: 'POST',
                body: user,
            })
        }),

        loginUser: builder.mutation({
            query: (user) => ({
                url: "/users/login",
                method: 'POST',
                body: user,
            })
        }),

        logoutUser: builder.mutation({
            query: () => ({
                url: '/users/logout',
                method: 'DELETE',
            })
        }),
        //post routes
        createPost: builder.mutation({
            query: (article) => ({
                url: '/posts',
                method: 'POST',
                body: article,
            }),
            invalidatesTags: ["Post"],
        }),
        //get all post to home page
        getAllPosts: builder.query({
            query: () => ({
                url: "/posts",
            }),
            providesTags : ["Post"],
        }),

        getOnePost: builder.query({
            query: (id) => ({
                url: `/posts/${id}`,
            })
        }),

        getAllUserPosts: builder.query({
            query: () => ({
                url: "/posts/me",
            }),
            providesTags : ["Post"],
        }),
         //delete article
         deletePost: builder.mutation({
             query: (id) => ({
                 url: `/posts/${id}`,
                 method : 'DELETE',
             }),
             invalidatesTags : ["Post"],
         }),
         //editing the article
         updatePost: builder.mutation({
             query: ({id, ...post}) => ({
                 url: `/posts/${id}`,
                 method: 'PATCH',
                 body : post,
             }),
             invalidatesTags : ["Post"],
         }),
    }),

    


})
export default appApi;

export const {
    useSignupUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useCreatePostMutation,
    useGetAllPostsQuery,
    useGetOnePostQuery,
    useGetAllUserPostsQuery,
    useDeletePostMutation,
    useUpdatePostMutation
} = appApi;
