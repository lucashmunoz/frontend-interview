import api from ".";
import { TodoList } from "../models";
import { endpoints } from "./endpoints";

export const listsAPI = {
  getAll: async function () {
    const response = await api.get(endpoints.todoLists);
    return response.data as TodoList[];
  },
  create: async function (name: string) {
    const response = await api.post(endpoints.todoLists, {
      name
    });

    return response.data as TodoList;
  },
  delete: async function (listId: number) {
    await api.delete(`${endpoints.todoLists}/${listId}`);
    return {
      deletedListId: listId
    };
  }
};
