import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "searchInput",
  initialState: {
    search: "",
      },
  reducers: {    
    searchRedux: (state, action) =>{
      state.search = action.payload;
    }
  },
});
export const { searchRedux } = searchSlice.actions;
export default searchSlice.reducer;
