import { render, screen } from "@testing-library/react";
import ServiceCard from "./index";

// Données mockées
const mockProps = {
  imageSrc: "http://src-image",
  imageAlt: "image-alt-text",
  content: "This is the card content",
};

describe("When a service card is created", () => {
  it("an image is displayed with alt value", () => {
    render(
      <ServiceCard imageSrc={mockProps.imageSrc} imageAlt={mockProps.imageAlt}>
        {" "}
      </ServiceCard>
    );
    const imageElement = screen.getByTestId("card-image-testid");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.alt).toEqual(mockProps.imageAlt);
  });

  it("a content is displayed", () => {
    render(
      <ServiceCard imageSrc={mockProps.imageSrc} imageAlt={mockProps.imageAlt}>
        {mockProps.content}
      </ServiceCard>
    );
    const contentElement = screen.getByText(mockProps.content);
    expect(contentElement).toBeInTheDocument();
  });
});
