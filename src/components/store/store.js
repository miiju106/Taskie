import { configureStore } from "@reduxjs/toolkit";
import taskListReducer from "./taskSlice"
// import searchInputReducer from "./searchSlice"
// import filterInputReducer from "./filterSlice"
import themeChangeReducer from "./themeSlice";


export const store = configureStore({
    reducer:{
        taskList:taskListReducer,
        themeChange:themeChangeReducer,

    }
})


