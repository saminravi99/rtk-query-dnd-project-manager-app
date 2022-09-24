import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    projectId: undefined,
    searchedText: undefined,
    changeTeamProjectId: undefined,
    deleteProjectId: undefined
};

const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        projectSelected: (state, action) => {
            state.projectId = action?.payload?.projectId;
        },
        searchedText: (state, action) => {
            state.searchedText = action?.payload?.searchedText;
        },
        changeTeamProjectId: (state, action) => {
            state.changeTeamProjectId = action?.payload?.changeTeamProjectId;
            state.deleteProjectId = action?.payload?.changeTeamProjectId;
        }

    },
});

export const {projectSelected, searchedText, changeTeamProjectId} = projectsSlice.actions;
export default projectsSlice.reducer;
