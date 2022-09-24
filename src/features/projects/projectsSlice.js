import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    projectId: undefined,
    searchedText: undefined,
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
        }
    },
});

export const {projectSelected, searchedText} = projectsSlice.actions;
export default projectsSlice.reducer;
