import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "themeChange",
  initialState: {
    theme: "light",
      },
  reducers: {    
    updateTheme: (state) =>{
      // this handles the state called theme which helps in switching modes(dark & light)
      state.theme = state.theme === "light" ? "dark" : "light";
    }
  }
});
export const { updateTheme } = themeSlice.actions;
export default themeSlice.reducer;
