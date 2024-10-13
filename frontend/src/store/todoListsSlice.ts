import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from ".";
import { TodoList } from "../models";
import { LoadingStatus } from "./types";
import { addTodoItem, deleteTodoItem, updateTodoItem } from "./todoItemsSlice";
import { listsAPI } from "../api/listsAPI";

interface TodoListsState {
  lists: TodoList[]
  fetchListsloading: LoadingStatus
  addListLoading: LoadingStatus
  deleteListLoading: LoadingStatus
}

const initialState: TodoListsState = {
  lists: [],
  fetchListsloading: "pending",
  addListLoading: "pending",
  deleteListLoading: "pending"
};

/**
 * Fetches the TODO lists
 */
export const fetchLists = createAsyncThunk(
  "users/fetchLists",
  async (_, { rejectWithValue }) => {
    try{
      return listsAPI.getAll();
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
      return listsAPI.create(name);
    }catch(error) {
      return rejectWithValue(error);
    }
  }
);

interface DeleteListParams {
  listId: number
}

/**
 * Deletes a TODO list.
 */
export const deleteList = createAsyncThunk(
  "users/deleteList",
  async ({ listId }: DeleteListParams, { rejectWithValue }) => {
    try{
      return listsAPI.delete(listId);
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
      .addCase(deleteList.pending, (state) => {
        state.deleteListLoading = "pending";
      })
      .addCase(deleteList.fulfilled, (state, action) => {
        const { deletedListId } = action.payload;
        state.deleteListLoading = "succeeded";

        // Removing the list from state
        const updatedLists = state.lists.filter(list => list.id !== deletedListId);
        state.lists = updatedLists;
      })
      .addCase(deleteList.rejected, (state) => {
        state.deleteListLoading = "failed";
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
