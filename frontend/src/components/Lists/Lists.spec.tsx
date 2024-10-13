import Lists from "./Lists";
import { vi } from "vitest";
import { renderWithProviders } from "../../utils/test-utils";
import { screen, waitFor } from "@testing-library/dom";

describe("Lists", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("renders the component", async () => {
    const { asFragment } = renderWithProviders(<Lists />);

    await waitFor(() => {
      expect(screen.getAllByRole("region")).toHaveLength(3);
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
