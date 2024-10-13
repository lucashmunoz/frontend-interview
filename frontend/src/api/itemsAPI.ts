import api from ".";
import { TodoItem } from "../models";
import { endpoints } from "./endpoints";

export const itemsAPI = {
  update: async function (listId: number, itemId: number, item: Partial<TodoItem> ) {
    const response = await api.put(endpoints.todoItem(listId, itemId), item);
    return {
      listId,
      updatedItem: response.data as TodoItem
    };
  },
  create: async function (listId: number, item: Pick<TodoItem, "name" | "description">) {
    const response = await api.post(endpoints.todoItems(listId), item);
    return {
      listId,
      newItem: response.data as TodoItem
    };
  },
  delete: async function (listId: number, itemId: number) {
    await api.delete(endpoints.todoItem(listId, itemId));
    return {
      listId,
      deletedItemId: itemId
    };
  }
};
