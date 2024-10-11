import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from ".";
import { endpoints } from "../api/endpoints";
import { TodoList } from "../models";
import api from "../api";

interface TodoListsState {
  lists: TodoList[]
  loading: "pending" | "succeeded" | "failed"
}

const initialState: TodoListsState = {
  lists: [],
  loading: "pending"
};

export const fetchLists = createAsyncThunk(
  "users/fetchLists",
  async (_, { rejectWithValue }) => {
    try{
      const response = await api.get(endpoints.todoLists);
      return response.data as TodoList[];
    }catch(error) {
      return rejectWithValue(error);
    }
  }
);

export const todoListsSlice = createSlice({
  name: "todoLists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLists.pending, (state) => {
        state.loading = "pending";
        state.lists = [];
      })
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.lists = action.payload;
      })
      .addCase(fetchLists.rejected, (state) => {
        state.loading = "failed";
        state.lists = [];
      });
  }
});

/** Returns all TODO Lists */
export const selectTodoLists = (state: RootState) => state.todoLists.lists || [];

export default todoListsSlice.reducer;
