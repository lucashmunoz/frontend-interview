import { http, HttpResponse } from "msw";
import generateUrlFromPath from "./generateUrlFromPath";
import { endpoints } from "../api/endpoints";
import { todoLists } from "./mocks";

const handleGetLists =
  http.get(generateUrlFromPath(endpoints.todoLists), () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json(todoLists);
  });

export const handlers = [
  handleGetLists
];
