import { http, HttpResponse } from "msw";
import generateUrlFromPath from "./generateUrlFromPath";
import { endpoints } from "../api/endpoints";
import { todoLists } from "./mocks";
import { TodoList } from "../models";

const handleGetLists =
  http.get(generateUrlFromPath(endpoints.todoLists), () => {
    return HttpResponse.json(todoLists);
  });

export const createHandlerAddList = (name: string) => {
  return http.post(generateUrlFromPath(endpoints.todoLists), () => {
    return HttpResponse.json({
      id: Math.random(),
      name,
      todoItems: []
    } as TodoList);
  });
};

export const handlers = [
  handleGetLists
];
