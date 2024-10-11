import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from ".";
import { endpoints } from "../api/endpoints";
import { TodoItem } from "../models";
import api from "../api";

interface TodoItemsState {
  updateTodoItemLoading: "pending" | "succeeded" | "failed"
  addTodoItemLoading: "pending" | "succeeded" | "failed"
}

const initialState: TodoItemsState = {
  updateTodoItemLoading: "pending",
  addTodoItemLoading: "pending"
};

interface UpdateTodoItemParams {
  id: number
  item: Partial<TodoItem>
}

/**
 * Updates a TODO item, accepts a partial of the item.
 */
export const updateTodoItem = createAsyncThunk(
  "users/updateTodoItem",
  async ({ id, item }: UpdateTodoItemParams, { rejectWithValue }) => {
    try{
      return await api.put(endpoints.todoItems(id), {
        item
      });
    }catch(error) {
      return rejectWithValue(error);
    }
  }
);

interface AddTodoItemParams {
  listId: number
  item: Pick<TodoItem, "name" | "description">
}

/**
 * Adds a TODO item to a list.
 */
export const addTodoItem = createAsyncThunk(
  "users/addTodoItem",
  async ({ listId, item }: AddTodoItemParams, { rejectWithValue }) => {
    try{
      return await api.post(endpoints.todoItems(listId), {
        item
      });
    }catch(error) {
      return rejectWithValue(error);
    }
  }
);

export const todoItemsSlice = createSlice({
  name: "todoItems",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateTodoItem.pending, (state) => {
        state.updateTodoItemLoading = "pending";
      })
      .addCase(updateTodoItem.fulfilled, (state) => {
        state.updateTodoItemLoading = "succeeded";
      })
      .addCase(updateTodoItem.rejected, (state) => {
        state.updateTodoItemLoading = "failed";
      })
      .addCase(addTodoItem.pending, (state) => {
        state.addTodoItemLoading = "pending";
      })
      .addCase(addTodoItem.fulfilled, (state) => {
        state.addTodoItemLoading = "succeeded";
      })
      .addCase(addTodoItem.rejected, (state) => {
        state.addTodoItemLoading = "failed";
      });
  }
});

/** Returns update TODO list item loading state */
export const selectUpdateTodoItemLoading = (state: RootState) => state.todoItems.updateTodoItemLoading;

/** Returns add TODO list item loading state */
export const selectAddTodoItemLoading = (state: RootState) => state.todoItems.addTodoItemLoading;

export default todoItemsSlice.reducer;
