import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "taskList",
  initialState: {
    tasks: [],
      },
  reducers: {
    update: (state, action) => {
      // this is used to put the input(object) gotten from the user into an array
      // state.tasks = [...state.tasks, action.payload]
      return { ...state, tasks: [...state.tasks, action.payload] };
    },
    
    complete: (state, action) => {
      // this changes the completed property to true and back to false
      state.tasks.forEach((item) => {
        if (item.id == action.payload.id) {
          !item.completed ? (item.completed = true) : (item.completed = false);
        }
      });
    },
    deleteTask: (state, action) => {
      // this deletes the task being clicked
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
