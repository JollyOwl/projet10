import { fireEvent, render, screen } from "@testing-library/react";
import Field, { FIELD_TYPES } from "./index";

describe("Field Component", () => {
  const defaultProps = {
    name: "test",
    label: "Field Name",
    placeholder: "field-placeholder",
  };

  it("sets a name on the field", () => {
    render(<Field {...defaultProps} name="field-name" />);
    const fieldElement = screen.getByTestId("field-testid");
    expect(fieldElement).toBeInTheDocument();
    expect(fieldElement.name).toEqual("field-name");
  });

  it("sets a placeholder on the field", () => {
    render(<Field {...defaultProps} placeholder="field-placeholder" />);
    const fieldElement = screen.getByTestId("field-testid");
    expect(fieldElement.placeholder).toEqual("field-placeholder");
  });

  it("sets a label on the field", () => {
    render(<Field {...defaultProps} label="field_label" />);
    const labelElement = screen.getByText(/field_label/);
    expect(labelElement).toBeInTheDocument();
  });

  describe("when the value changes", () => {
    it("executes onChange", () => {
      const onChange = jest.fn();
      render(<Field {...defaultProps} onChange={onChange} />);
      const fieldElement = screen.getByTestId("field-testid");
      fireEvent.change(fieldElement, { target: { value: 'new value' } });
      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });

  describe("when type is FIELD_TYPES.INPUT_TEXT", () => {
    it("renders a text input", () => {
      render(<Field {...defaultProps} type={FIELD_TYPES.INPUT_TEXT} />);
      const fieldElement = screen.getByTestId("field-testid");
      expect(fieldElement.tagName).toEqual("INPUT");
      expect(fieldElement.type).toEqual("text");
    });
  });

  describe("when type is FIELD_TYPES.TEXTAREA", () => {
    it("renders a textarea", () => {
      render(<Field {...defaultProps} type={FIELD_TYPES.TEXTAREA} />);
      const fieldElement = screen.getByTestId("field-testid");
      expect(fieldElement.tagName).toEqual("TEXTAREA");
    });
  });

  describe("when type is invalid", () => {
    it("defaults to text input", () => {
      render(<Field {...defaultProps} type="wrong-type" />);
      const fieldElement = screen.getByTestId("field-testid");
      expect(fieldElement.tagName).toEqual("INPUT");
      expect(fieldElement.type).toEqual("text");
    });
  });
});
