import { apiSlice } from "../api/apiSlice";

export const teamsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeams: builder.query({
      query: (email) => `/teams?teamMembers_like=${email}`,
      providesTags: ["Teams"],
    }),
    getTeam: builder.query({
      query: (teamId) => `/teams/${teamId}`,
      providesTags: ["Team"],
    }),
    addTeam: builder.mutation({
      query: ({ creatorEmail, data }) => ({
        url: "/teams",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [""],
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        const team = await queryFulfilled;
        if (team?.data.id) {
          dispatch(
            apiSlice.util.updateQueryData(
              "getTeams",
              args.creatorEmail,
              (draft) => {
                draft.push(team.data);
              }
            )
          );
          // update teams cache pessimistically end
        }
      },
    }),
    addTeamMember: builder.mutation({
      query: ({ id, data}) => ({
        url: `/teams/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [""],
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        // optimistic cache update start
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getTeam", args.id, (draft) => {
            draft.addTeamMembers = args.data.addTeamMembers;
            draft.membersDetails = args.data.membersDetails;
            return draft;
          })
        );
        // optimistic cache update end

        //catch the error and revert the optimistic update
        try {
          await queryFulfilled;
        } catch (err) {
          patchResult.undo();
        }
      },
    }),
    deleteTeam: builder.mutation({
      query: ({ id, creator }) => ({
        url: `/teams/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [],
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        // optimistic cache update start
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getTeams", args.creator, (draft) => {
            draft = draft.filter((t) => Number(t?.id) != args.id);
            return draft;
          })
        );
        // optimistic cache update end

        //catch the error and revert the optimistic update
        try {
          await queryFulfilled;
        } catch (err) {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetTeamsQuery,
  useGetTeamQuery,
  useAddTeamMutation,
  useAddTeamMemberMutation,
  useDeleteTeamMutation,
} = teamsApi;
