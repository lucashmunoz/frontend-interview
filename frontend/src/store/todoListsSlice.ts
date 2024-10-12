import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from ".";
import { endpoints } from "../api/endpoints";
import { TodoList } from "../models";
import api from "../api";
import { LoadingStatus } from "./types";

interface TodoListsState {
  lists: TodoList[]
  fetchListsloading: LoadingStatus
  addListLoading: LoadingStatus
}

const initialState: TodoListsState = {
  lists: [],
  fetchListsloading: "pending",
  addListLoading: "pending"
};

/**
 * Fetches the TODO lists
 */
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

interface AddListParams {
  name: string
}

/**
 * Adds a TODO list.
 */
export const addList = createAsyncThunk(
  "users/addList",
  async ({ name }: AddListParams, { rejectWithValue }) => {
    try{
      await api.post(endpoints.todoLists, {
        name
      });
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
        state.fetchListsloading = "pending";
        state.lists = [];
      })
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.fetchListsloading = "succeeded";
        state.lists = action.payload;
      })
      .addCase(fetchLists.rejected, (state) => {
        state.fetchListsloading = "failed";
        state.lists = [];
      })
      .addCase(addList.pending, (state) => {
        state.addListLoading = "pending";
      })
      .addCase(addList.fulfilled, (state) => {
        state.addListLoading = "succeeded";
      })
      .addCase(addList.rejected, (state) => {
        state.addListLoading = "failed";
      });
  }
});

/** Returns all TODO Lists */
export const selectTodoLists = (state: RootState) => state.todoLists.lists || [];

export default todoListsSlice.reducer;
