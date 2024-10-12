import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddNewInput from "./AddNewInput";
import { vi } from "vitest";

const mockOnInputChange = vi.fn();
const mockOnButtonClick = vi.fn();

describe("AddNewInput", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("renders the component", () => {
    const { asFragment } = render(
      <AddNewInput
        inputValue="test"
        onInputChange={mockOnInputChange}
        inputPlaceholder="Input Placeholder"
        onButtonClick={mockOnButtonClick}
        buttonAriaLabel="Button Aria Label"
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should call the onInputChange callback on input change", async () => {
    render(
      <AddNewInput
        inputValue="test"
        onInputChange={mockOnInputChange}
        inputPlaceholder="Input Placeholder"
        onButtonClick={mockOnButtonClick}
        buttonAriaLabel="Button Aria Label"
      />
    );

    const input = screen.getByRole("textbox");
    await userEvent.type(input, "New input");

    expect(mockOnInputChange).toHaveBeenCalled();
  });

  it("should call the mockOnButtonClick callback on button click", async () => {
    render(
      <AddNewInput
        inputValue="test"
        onInputChange={mockOnInputChange}
        inputPlaceholder="Input Placeholder"
        onButtonClick={mockOnButtonClick}
        buttonAriaLabel="Button Aria Label"
      />
    );

    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(mockOnButtonClick).toHaveBeenCalled();
  });

  it("should not call the mockOnButtonClick callback on button click when input is empty", async () => {
    render(
      <AddNewInput
        inputValue=""
        onInputChange={mockOnInputChange}
        inputPlaceholder="Input Placeholder"
        onButtonClick={mockOnButtonClick}
        buttonAriaLabel="Button Aria Label"
      />
    );

    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(mockOnButtonClick).not.toHaveBeenCalled();
  });
});
