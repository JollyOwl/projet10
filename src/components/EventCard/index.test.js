import { render, screen } from "@testing-library/react";
import EventCard from "./index";

describe("EventCard Component", () => {
  const defaultProps = {
    imageSrc: "http://src-image",
    imageAlt: "image-alt-text",
    date: new Date("2022-04-01"),
    title: "test event",
    label: "test label",
  };

  it("displays an image with alt value", () => {
    render(<EventCard {...defaultProps} />);
    const imageElement = screen.getByTestId("card-image-testid");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.alt).toEqual("image-alt-text");
  });

  it("displays a title, label, and month", () => {
    render(<EventCard {...defaultProps} />);
    const titleElement = screen.getByText(/test event/);
    const monthElement = screen.getByText(/avril/);
    const labelElement = screen.getByText(/test label/);
    expect(titleElement).toBeInTheDocument();
    expect(labelElement).toBeInTheDocument();
    expect(monthElement).toBeInTheDocument();
  });

  describe("when the small prop is passed", () => {
    it("adds the small modifier", () => {
      render(<EventCard {...defaultProps} small />);
      const cardElement = screen.getByTestId("card-testid");
      expect(cardElement.className.includes("EventCard--small")).toBe(true);
    });
  });
});
