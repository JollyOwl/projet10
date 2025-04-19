/* eslint-disable react/self-closing-comp */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Modal from "./index";

// Données mockées
const modalContent = <div>modal content</div>;

// Fonction de rendu réutilisable
const renderModal = (props = {}) =>
  render(
    <Modal Content={modalContent} {...props}>
      {() => <button data-testid="open-modal"></button>}
    </Modal>
  );

describe("Modal component", () => {
  describe("When a click is triggered to display the modal", () => {
    it("should display the modal content after clicking the open button", async () => {
      const { getByTestId, queryByText } = renderModal();

      // Vérifier que le contenu n'est pas affiché au début
      expect(queryByText("modal content")).not.toBeInTheDocument();

      // Déclencher un clic pour ouvrir le modal
      fireEvent.click(getByTestId("open-modal"));

      // Attendre que l'élément modal apparaisse dans le DOM
      await waitFor(() => expect(screen.getByText("modal content")).toBeInTheDocument(), { timeout: 500 });
    });
  });

  describe("When a click is triggered on the close button", () => {
    it("should hide the modal content", async () => {
      const { getByTestId, queryByText } = renderModal({ opened: true });

      // Vérifier que le contenu du modal est visible initialement
      expect(screen.getByText("modal content")).toBeInTheDocument();

      // Déclencher un clic sur le bouton de fermeture
      fireEvent.click(getByTestId("close-modal"));

      // Attendre que l'élément modal disparaisse
      await waitFor(() => expect(queryByText("modal content")).not.toBeInTheDocument(), { timeout: 500 });
    });
  });
});
