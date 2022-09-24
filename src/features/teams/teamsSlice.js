import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teamId: undefined,
  color: undefined,
  teamName: undefined,
};

const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    teamSelected: (state, action) => {
      state.teamId = action?.payload?.teamId;
      state.teamName = action?.payload?.teamName;
    },
    colorSelected: (state, action) => {
      state.color = action.payload;
    },

  },
});

export const {teamSelected, colorSelected} = teamsSlice.actions;
export default teamsSlice.reducer;
