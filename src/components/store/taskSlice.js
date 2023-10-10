import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "taskList",
  initialState: {
    tasks: [],
      },
  reducers: {
    update: (state, action) => {
      // state.tasks = [...state.tasks, action.payload]
      return { ...state, tasks: [...state.tasks, action.payload] };
    },
    
    complete: (state, action) => {
      state.tasks.forEach((item) => {
        if (item.id == action.payload.id) {
          !item.completed ? (item.completed = true) : (item.completed = false);
        }
      });
    },
    deleteTask: (state, action) => {
      const completeList = state.tasks.filter((item) => item.id != action.payload.id);
      return {
        ...state,
        tasks: completeList,
      };
    }
    
  },
});
export const { update, complete, deleteTask} = taskSlice.actions;
export default taskSlice.reducer;
