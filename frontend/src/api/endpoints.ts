export const endpoints = {
  /**
   *
   * @returns Todo lists api endpoint.
   */
  todoLists: "/api/todo-lists",
  /**
   *
   * @param listId The id of the list that contains the items.
   * @returns Api endpoint of the given list.
   */
  todoItems: (listId: number) => `/api/todo-lists/${listId}/todo-items`,
  /**
   *
   * @param listId The id of the list that contains the item.
   * @param itemId The item id.
   * @returns Api endpoint of the given item.
   */
  todoItem: (listId:number, itemId: number) => `/api/todo-lists/${listId}/todo-items/${itemId}`
} as const;
