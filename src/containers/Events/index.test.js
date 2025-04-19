import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { api, DataProvider } from "../../contexts/DataContext";
import Events from "./index";

const mockData = {
  events: [
    {
      id: 1,
      type: "soirée entreprise",
      date: "2022-04-29T20:28:45.744Z",
      title: "Conférence #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description: "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: [
        "1 espace d’exposition",
        "1 scéne principale",
        "2 espaces de restaurations",
        "1 site web dédié",
      ],
    },
    {
      id: 2,
      type: "forum",
      date: "2022-04-29T20:28:45.744Z",
      title: "Forum #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description: "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: ["1 espace d’exposition", "1 scéne principale"],
    },
  ],
};

const renderComponent = (dataMock, errorMock = null) => {
  api.loadData = jest.fn().mockReturnValue(errorMock ? Promise.reject(errorMock) : Promise.resolve(dataMock));
  render(
    <DataProvider>
      <Events />
    </DataProvider>
  );
};

describe("Events component", () => {
  it("displays a list of event cards", async () => {
    renderComponent(mockData);
    const eventCards = await screen.findAllByText("avril");
    expect(eventCards.length).toBeGreaterThan(0);
  });

  describe("when an error occurs", () => {
    it("displays an error message", async () => {
      renderComponent(mockData, new Error("Failed to load"));
      const errorMessage = await screen.findByText(/an error occured/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe("when a category is selected", () => {
    it("displays a filtered list", async () => {
      renderComponent(mockData);
      await screen.findByText("Forum #productCON");
      fireEvent.click(await screen.findByTestId("collapse-button-testid"));
      fireEvent.click((await screen.findAllByText("soirée entreprise"))[0]);
      await screen.findByText("Conférence #productCON");
      expect(screen.queryByText("Forum #productCON")).not.toBeInTheDocument();
    });
  });

  describe("when an event is clicked", () => {
    it("displays the event details", async () => {
      renderComponent(mockData);
      fireEvent.click(await screen.findByText("Conférence #productCON"));
      await waitFor(() => {
        expect(screen.getByText("24-25-26 Février")).toBeInTheDocument();
        expect(screen.getByText("1 site web dédié")).toBeInTheDocument();
      });
    });
  });
});
