import { combineReducers, configureStore } from "@reduxjs/toolkit";
import todoListsReducer from "./todoListsSlice";
import todoItemsReducer from "./todoItemsSlice";

const rootReducer = combineReducers({
  todoLists: todoListsReducer,
  todoItems: todoItemsReducer
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  });
};

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]
