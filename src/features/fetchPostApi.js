import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const HEADERS = process.env.REACT_APP_API_KEY;
const MAIN_ROUTE = process.env.REACT_APP_MAIN_ROUTE;

// Define a service using a base URL and expected endpoints
export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: MAIN_ROUTE,
    prepareHeaders(headers) {
      headers.set("app-id", HEADERS);

      return headers;
    },
  }),
  tagTypes: ["Posts", "Comment"],
  endpoints: (builder) => ({
    fetchPosts: builder.query({
      query: (pageNumber = 0) => `post?page=${pageNumber}&limit=12`,
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "Posts", id })),
              { type: "Posts", id: "LIST" },
            ]
          : [{ type: "Posts", id: "LIST" }],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/post/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
    getPost: builder.query({
      query: (id) => `post/${id}`,
      providesTags: (result, error, id) => [{ type: "Posts", id }],
    }),
    getComments: builder.query({
      query: (id) => `post/${id}/comment`,
      providesTags: ["Comment"],
    }),
    addComment: builder.mutation({
      query: (body) => ({
        url: `comment/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Comment", id: "LIST" }],
    }),
    updatePost: builder.mutation({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `post/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Posts", id }],
    }),
    addPost: builder.mutation({
      query(body) {
        return {
          url: `post/create`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
  }),
});

// Export hooks for usage in functional components, which are auto-generated based on the defined endpoints
export const {
  useFetchPostsQuery,
  useDeletePostMutation,
  useGetPostQuery,
  useGetCommentsQuery,
  useAddCommentMutation,
  useUpdatePostMutation,
  useAddPostMutation,
} = postApi;
