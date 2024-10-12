import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from ".";
import { endpoints } from "../api/endpoints";
import { TodoList } from "../models";
import api from "../api";
import { LoadingStatus } from "./types";
import { addTodoItem, deleteTodoItem, updateTodoItem } from "./todoItemsSlice";

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
      const response = await api.post(endpoints.todoLists, {
        name
      });

      return response.data as TodoList;
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
      .addCase(addList.fulfilled, (state, action) => {
        state.addListLoading = "succeeded";

        // Adding the new list to state
        const updatedLists = [...state.lists, action.payload];
        state.lists = updatedLists;
      })
      .addCase(addList.rejected, (state) => {
        state.addListLoading = "failed";
      })
      .addCase(addTodoItem.fulfilled, (state, action) => {
        const { listId, newItem } = action.payload;

        // Updating the item on state
        const updatedLists = state.lists.map(list => {
          if(list.id !== listId) {
            return list;
          }

          return {
            ...list,
            todoItems: [...list.todoItems, newItem]
          };
        });

        state.lists = updatedLists;
      })
      .addCase(updateTodoItem.fulfilled, (state, action) => {
        const { listId, updatedItem } = action.payload;

        // Updating the item on state
        const updatedLists = state.lists.map(list => {
          if(list.id !== listId) {
            return list;
          }

          const updatedItems = list.todoItems.map(item => {
            if(item.id === updatedItem.id) {
              return updatedItem;
            }
            return item;
          });

          return {
            ...list,
            todoItems: updatedItems
          };
        });

        state.lists = updatedLists;
      })
      .addCase(deleteTodoItem.fulfilled, (state, action) => {
        const { listId, deletedItemId } = action.payload;
        // Updating the item on state
        const updatedLists = state.lists.map(list => {
          if(list.id !== listId) {
            return list;
          }

          const updatedItems = list.todoItems.filter(
            item => item.id !== deletedItemId
          );

          return {
            ...list,
            todoItems: updatedItems
          };
        });

        state.lists = updatedLists;
      });
  }
});

/** Returns all TODO Lists */
export const selectTodoLists = (state: RootState) => state.todoLists.lists || [];

export default todoListsSlice.reducer;
