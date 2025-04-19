import { fireEvent, render, screen } from "@testing-library/react";
import Button, { BUTTON_TYPES } from "./index";

describe("Button Component", () => {
  // fonction avec props optionnelles pour éviter les répétitions de render
  const renderButton = (props = {}) => render(<Button {...props} />);

  it("includes a title", () => {
    renderButton({ title: "my-button", type: BUTTON_TYPES.DEFAULT });
    const buttonElement = screen.getByTitle("my-button");
    expect(buttonElement).toBeInTheDocument();
  });

  it("displays a label", () => {
    renderButton({ children: "label", type: BUTTON_TYPES.DEFAULT });
    const buttonElement = screen.getByText(/label/);
    expect(buttonElement).toBeInTheDocument();
  });

  describe("when clicked", () => {
    it("executes the onClick event", () => {
      const onClick = jest.fn();
      renderButton({ onClick });
      const buttonElement = screen.getByTestId("button-test-id");
      fireEvent.click(buttonElement);
      expect(onClick).toHaveBeenCalled();
    });
  });

  describe("when the type is submit", () => {
    it("creates a submit input", () => {
      renderButton({ type: BUTTON_TYPES.SUBMIT, children: "label" });
      const buttonElement = screen.getByTestId("button-test-id");
      expect(buttonElement.type).toBe("submit");
    });
  });
});
