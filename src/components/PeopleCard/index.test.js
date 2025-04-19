import { render, screen } from "@testing-library/react";
import PeopleCard from "./index";

// Données mockées
const mockData = {
  imageSrc: "http://src-image",
  imageAlt: "image-alt-text",
  name: "test name",
  position: "test position"
};

describe("When a people card is created", () => {
  it("an image is displayed with alt value", () => {
    render(
      <PeopleCard 
        imageSrc={mockData.imageSrc} 
        imageAlt={mockData.imageAlt} 
        name={mockData.name} 
        position={mockData.position} 
      />
    );
    const imageElement = screen.getByTestId("card-image-testid");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.alt).toEqual(mockData.imageAlt);
  });

  it("a title and a month are displayed", () => {
    render(
      <PeopleCard
        imageSrc={mockData.imageSrc}
        imageAlt={mockData.imageAlt}
        name={mockData.name}
        position={mockData.position}
      />
    );
    const nameElement = screen.getByText(mockData.name);
    const titleElement = screen.getByText(mockData.position);
    expect(nameElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
  });
});
