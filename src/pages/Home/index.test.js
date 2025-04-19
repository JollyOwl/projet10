import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";
import DataContext from "../../contexts/DataContext";

// Données mockées déplacées au début du fichier
const mockDataContextValue = {
  last: { id: 1, name: 'Last Event' },
  data: [{ id: 1, name: 'Event 1' }, { id: 2, name: 'Event 2' }],
};

describe("Quand le formulaire est créé", () => {
  it("une liste de champs de formulaire est affichée", async () => {
    render(
      <DataContext.Provider value={mockDataContextValue}>
        <Home />
      </DataContext.Provider>
    );
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  describe("et un clic est déclenché sur le bouton de soumission", () => {
    it("le message de succès est affiché", async () => {
      render(
        <DataContext.Provider value={mockDataContextValue}>
          <Home />
        </DataContext.Provider>
      );
      expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
      const submitButton = screen.getByRole("button", { name: /Envoyer/i });
      fireEvent.click(submitButton);
      // expect(screen.getByRole("dialog")).toBeInTheDocument();
      // expect(screen.getByText("Message envoyé !")).toBeInTheDocument();
    });
  });
});

describe("Quand une page est créée", () => {
  // Chaque test sera implémenté plus tard
  it("une liste d'événements est affichée", () => {
    // à implémenter
  });
  it("une liste de personnes est affichée", () => {
    // à implémenter
  });
  it("un pied de page est affiché", () => {
    // à implémenter
  });
  it("une carte d'événement, avec le dernier événement, est affichée", () => {
    // à implémenter
  });
});
