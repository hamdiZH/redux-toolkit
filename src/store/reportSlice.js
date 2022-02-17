import { createSlice } from "@reduxjs/toolkit";

const reportSlice = createSlice({
  name: 'report',
  initialState: { log: [] },
  reducers: {
    logInsert: (state, action) => {
      state.log.push(action.payload);
    }
  }
});

export const { logInsert }  = reportSlice.actions;

export default reportSlice.reducer