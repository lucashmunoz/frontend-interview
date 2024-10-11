import { configureStore } from "@reduxjs/toolkit";
import todoListsReducer from "./todoListsSlice";
import todoItemsReducer from "./todoItemsSlice";

export const store = configureStore({
  reducer: {
    todoLists: todoListsReducer,
    todoItems: todoItemsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
