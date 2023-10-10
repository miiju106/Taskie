import { configureStore } from "@reduxjs/toolkit";
import taskListReducer from "./taskSlice"
import searchInputReducer from "./searchSlice"
import filterInputReducer from "./filterSlice"

export const store = configureStore({
    reducer:{
        taskList:taskListReducer,
        searchInput:searchInputReducer,
        filterInput:filterInputReducer
    }
})


