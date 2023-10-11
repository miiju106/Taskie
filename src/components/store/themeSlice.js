import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "themeChange",
  initialState: {
    theme: "light",
      },
  reducers: {    
    updateTheme: (state) =>{
      state.theme = state.theme === "light" ? "dark" : "light";
    }
  }
});
export const { updateTheme } = themeSlice.actions;
export default themeSlice.reducer;
