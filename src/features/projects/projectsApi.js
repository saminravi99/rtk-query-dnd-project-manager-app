import { apiSlice } from "../api/apiSlice";

export const projectsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: (status) => `/projects?projectStatus_like=${status}`,
      providesTags: ["Projects"],
    }),
    getProject: builder.query({
      query: (projectId) => `/projects/${projectId}`,
      providesTags: ["Project"],
    }),
    addProject: builder.mutation({
      query: ({ status, data }) => ({
        url: "/projects",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [],
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        const project = await queryFulfilled;
        if (project?.data?.id) {
          dispatch(
            apiSlice.util.updateQueryData(
              "getProjects",
              args.status,
              (draft) => {
                draft.push(project?.data);
                return draft;
              }
            )
          );
          // update projects cache pessimistically end
        }
      },
    }),
    changeStatus: builder.mutation({
      query: ({ id, data, status, destinationStatus }) => ({
        url: `/projects/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [""],
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        console.log("hello");
        // optimistic cache update for backlog Cache
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getProjects", args.status, (draft) => {
            let newDraft = draft.filter((p) => p.id !== args.id);
            return newDraft;
          })
        );
        // optimistic cache update end for backlog Cache

        // catch error and revert optimistic cache update
        try {
          const res = await queryFulfilled;
          if (res?.data?.teamId) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getProjects",
                args.destinationStatus,
                (draft) => {
                  let newDraft = [...draft, res?.data];
                  return newDraft;
                }
              )
            );
          }
        } catch (error) {
          patchResult.undo();
        }
      },
    }),
    changeTeam: builder.mutation({
      query: ({ id, data, status }) => ({
        url: `/projects/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [],
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        // optimistic cache update start
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getProjects", args.status, (draft) => {
            const draftProject = draft.find((p) => p.id == args.id);
            draftProject.assignedTeam = args.data.assignedTeam;
            draftProject.teamId = args.data.teamId;
            console.log(JSON.stringify(draftProject));
            return draft 
          })
        );
        // optimistic cache update end

        //catch error and undo optimistic cache update
        try {
          await queryFulfilled;
        } catch (err) {
          patchResult.undo();
        }
      },
    }),
    deleteProject: builder.mutation({
      query: ({ id, status }) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [""],
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        // optimistic cache update start
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getProjects", args.status, (draft) => {
            let newDraft = draft?.filter((p) => Number(p?.id) !== args?.id);
            return newDraft;
          })
        );
        // optimistic cache update end

        //catch error and undo optimistic cache update
        try {
          await queryFulfilled;
        } catch (err) {
          patchResult.undo();
        }
      },
    }),
    getSearchedProjects : builder.query({
      query: (searchTerm) => `/projects?projectTitle_like=${searchTerm}`,
    })
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectQuery,
  useAddProjectMutation,
  useChangeTeamMutation,
  useChangeStatusMutation,
  useDeleteProjectMutation,
  useGetSearchedProjectsQuery
} = projectsApi;
