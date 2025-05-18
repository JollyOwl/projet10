import { render, screen, act } from "@testing-library/react";
import Slider from "./index";
import { api, DataProvider } from "../../contexts/DataContext";


const mockData = {
  focus: [
    {
      id: "A",
      title: "World economic forum",
      description: "Oeuvre à la coopération entre le secteur public et le privé.",
      date: "2022-01-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png"
    },
    {
      id: "B",
      title: "Nordic design week",
      description: "Conférences sur le design de demain dans le digital",
      date: "2022-03-29T20:28:45.744Z",
      cover: "/images/teemu-paananen-bzdhc5b3Bxs-unsplash1.png"
    },
    {
      id: "C",
      title: "Sneakercraze market",
      description: "Rencontres de spécialistes des Sneakers Européens.",
      date: "2022-05-29T20:28:45.744Z",
      cover: "/images/jakob-dalbjorn-cuKJre3nyYc-unsplash 1.png"
    }
  ]
};

describe("Slider component", () => {
  beforeEach(() => {
    // Mock de l'API avant chaque test
    api.loadData = jest.fn().mockReturnValue(mockData);
  });

  it("should display the list of events sorted by date", async () => {
    render(
      <DataProvider>
        <Slider />
      </DataProvider>
    );

    // Vérifie que les événements sont affichés dans l'ordre décroissant
    const titles = await screen.findAllByRole('heading', { level: 3 });
    expect(titles[0]).toHaveTextContent("Sneakercraze market"); // Plus récent
    expect(titles[1]).toHaveTextContent("Nordic design week");
    expect(titles[2]).toHaveTextContent("World economic forum"); // Plus ancien
  });

  it("should handle empty or invalid data", async () => {
    api.loadData = jest.fn().mockReturnValue({ focus: null });
    
    render(
      <DataProvider>
        <Slider />
      </DataProvider>
    );

    // Vérifie que le composant ne plante pas avec des données invalides
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it("should auto-advance slides every 5 seconds", async () => {
    jest.useFakeTimers();
    
    render(
      <DataProvider>
        <Slider />
      </DataProvider>
    );

    // Attendre que les données soient chargées
    await screen.findByText("Sneakercraze market");

    // Vérifie le slide initial
    expect(screen.getByText("Sneakercraze market")).toBeInTheDocument();

    // Avance le temps de 5 secondes
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // Vérifie que le slide a changé
    expect(screen.getByText("Nordic design week")).toBeInTheDocument();

    jest.useRealTimers();
  });

  it("should handle manual navigation via radio buttons", async () => {
    render(
      <DataProvider>
        <Slider />
      </DataProvider>
    );

    await screen.findByText("Sneakercraze market");

    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons).toHaveLength(3); // Vérifie qu'il y a bien 3 boutons radio
    
    radioButtons[1].click();
  
    expect(screen.getByText("Nordic design week")).toBeInTheDocument();
  });

  it("should display the correct month for each event", async () => {
    render(
      <DataProvider>
        <Slider />
      </DataProvider>
    );

    await screen.findByText("Sneakercraze market");

    // Vérifie que les mois sont correctement affichés dans le bon contexte
    const slides = screen.getAllByRole('heading', { level: 3 });
    
    // Pour chaque slide, vérifie que le mois correspondant est présent dans le même conteneur
    slides.forEach((slide, index) => {
      const slideContainer = slide.closest('.SlideCard__description');
      const monthElement = slideContainer.querySelector('div');
      
      if (index === 0) expect(monthElement).toHaveTextContent('mai');
      if (index === 1) expect(monthElement).toHaveTextContent('mars');
      if (index === 2) expect(monthElement).toHaveTextContent('janvier');
    });
  });
});
