import { apiSlice } from "../api/apiSlice";

export const projectsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: ({ status, email }) =>
        `/projects?projectStatus_like=${status}&teamMembers_like=${email}`,
      providesTags: ["Projects"],
    }),
    getProject: builder.query({
      query: (projectId) => `/projects/${projectId}`,
      providesTags: (result, error, projectId) => [
        { type: "Project", id: projectId },
      ],
    }),
    addProject: builder.mutation({
      query: ({ status, data, email }) => ({
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
              {
                status: args.status,
                email: args.email,
              },
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
      query: ({
        id,
        data,
        status,
        destinationStatus,
        project,
        email,
      }) => ({
        url: `/projects/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [""],
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        // optimistic cache update for projects cache on status change start
        const patchResultSource = dispatch(
          apiSlice.util.updateQueryData(
            "getProjects",
            {
              status: args.status,
              email: args.email,
            },
            (draft) => {
              let newDraft = draft.filter((p) => p.id !== args.id);
              return newDraft;
            }
          )
        );

        const patchResultDestination = dispatch(
          apiSlice.util.updateQueryData(
            "getProjects",
            {
              status: args.destinationStatus,
              email: args.email,
            },
            (draft) => {
              let newProject = {
                ...args.project,
                projectStatus: args.destinationStatus,
              };
              draft.push(newProject);
              return draft;
            }
          )
        );
        // optimistic cache update end for Projects Cache on status change end

        // catch error and revert optimistic cache update
        try {
          await queryFulfilled;
        } catch (error) {
          patchResultSource.undo();
          patchResultDestination.undo();
        }
      },
    }),
    changeTeam: builder.mutation({
      query: ({ id, data, status, email }) => ({
        url: `/projects/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, args) => [
        "Projects",
        {
          type: "Project",
          id: args.id,
        },
      ],
    }),
    deleteProject: builder.mutation({
      query: ({ id, status, email }) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [""],
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        // optimistic cache update start
        const patchResult = dispatch(
          apiSlice.util.updateQueryData(
            "getProjects",
            {
              status: args.status,
              email: args.email,
            },
            (draft) => {
              let newDraft = draft?.filter((p) => Number(p?.id) !== args?.id);
              return newDraft;
            }
          )
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
    getSearchedProjects: builder.query({
      query: (searchTerm) => `/projects?projectTitle_like=${searchTerm}`,
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectQuery,
  useAddProjectMutation,
  useChangeTeamMutation,
  useChangeStatusMutation,
  useDeleteProjectMutation,
  useGetSearchedProjectsQuery,
} = projectsApi;
