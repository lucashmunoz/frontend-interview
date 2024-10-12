import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from ".";
import { endpoints } from "../api/endpoints";
import { TodoItem } from "../models";
import api from "../api";
import { LoadingStatus } from "./types";

interface TodoItemsState {
  updateTodoItemLoading: LoadingStatus
  addTodoItemLoading: LoadingStatus
  deleteTodoItemLoading: LoadingStatus
}

const initialState: TodoItemsState = {
  updateTodoItemLoading: "pending",
  addTodoItemLoading: "pending",
  deleteTodoItemLoading: "pending"
};

interface UpdateTodoItemParams {
  listId: number
  itemId: number
  item: Partial<TodoItem>
}

/**
 * Updates a TODO item, accepts a partial of the item.
 */
export const updateTodoItem = createAsyncThunk(
  "users/updateTodoItem",
  async ({ listId, itemId, item }: UpdateTodoItemParams, { rejectWithValue }) => {
    try{
      const response = await api.put(endpoints.todoItem(listId, itemId), item);
      return {
        listId,
        updatedItem: response.data as TodoItem
      };
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
      const response = await api.post(endpoints.todoItems(listId), item);
      return {
        listId,
        newItem: response.data as TodoItem
      };
    }catch(error) {
      return rejectWithValue(error);
    }
  }
);

interface DeleteTodoItemParams {
  listId: number
  itemId: number
}

/**
 * Deletes a TODO item.
 */
export const deleteTodoItem = createAsyncThunk(
  "users/deleteTodoItem",
  async ({ listId, itemId }: DeleteTodoItemParams, { rejectWithValue }) => {
    try{
      await api.delete(endpoints.todoItem(listId, itemId));
      return {
        listId,
        deletedItemId: itemId
      };
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
      })
      .addCase(deleteTodoItem.pending, (state) => {
        state.deleteTodoItemLoading = "pending";
      })
      .addCase(deleteTodoItem.fulfilled, (state) => {
        state.deleteTodoItemLoading = "succeeded";
      })
      .addCase(deleteTodoItem.rejected, (state) => {
        state.deleteTodoItemLoading = "failed";
      });
  }
});

/** Returns update TODO list item loading state */
export const selectUpdateTodoItemLoading = (state: RootState) => state.todoItems.updateTodoItemLoading;

/** Returns add TODO list item loading state */
export const selectAddTodoItemLoading = (state: RootState) => state.todoItems.addTodoItemLoading;

/** Returns delete TODO list item loading state */
export const selectDeleteTodoItemLoading = (state: RootState) => state.todoItems.deleteTodoItemLoading;

export default todoItemsSlice.reducer;
