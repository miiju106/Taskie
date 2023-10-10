import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filterInput",
  initialState: {
    filter: [],
      },
  reducers: {    
    updateFilter: (state, action) => { 
        state.filter =  action.payload    
    //   return { ...state, filter: [...state.filter, action.payload] };
    },
    
  },
});
export const {  updateFilter } = filterSlice.actions;
export default filterSlice.reducer;
