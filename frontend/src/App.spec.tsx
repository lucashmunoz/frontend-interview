import App from "./App";
import { vi } from "vitest";
import { screen, waitFor } from "@testing-library/dom";
import { renderWithProviders } from "./utils/test-utils";
import { server } from "./mocks/server";
import { createHandlerAddList, handlers } from "./mocks/handlers";
import userEvent from "@testing-library/user-event";

describe("App", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should add a new list", async () => {
    const newListName = "My new list";
    server.use(...handlers, createHandlerAddList(newListName));

    renderWithProviders(<App />);

    await waitFor(() => {
      expect(screen.getAllByRole("region")).toHaveLength(3);
    });

    const addANewListInput = screen.getByRole("textbox", {
      name: /Add a new List.../i
    });
    await userEvent.type(addANewListInput, newListName);

    const addANewListButton = screen.getByRole("button", {
      name: /Add new List/i
    });
    await userEvent.click(addANewListButton);

    await waitFor(() => {
      expect(screen.getByRole("region", {
        name: newListName
      })).toBeInTheDocument();
    });
  });
});
