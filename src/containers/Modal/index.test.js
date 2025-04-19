/* eslint-disable react/self-closing-comp */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Modal from "./index";

// Données mockées
const modalContent = <div>modal content</div>;

// Fonction de rendu réutilisable CORRIGÉE
// La fonction children récupère setIsOpened et l'utilise dans l'onClick du bouton
const renderModal = (props = {}) =>
  render(
    <Modal Content={modalContent} {...props}>
      {({ setIsOpened }) => ( // Récupération de setIsOpened depuis les props de la fonction children
        <button
          data-testid="open-modal"
          onClick={() => setIsOpened(true)} // Appel de setIsOpened(true) lors du clic
        />
      )}
    </Modal>
  );

describe("Modal component", () => {
  describe("When it is initially rendered", () => {
    // Ce test vérifie le rendu conditionnel basé sur la prop 'opened',
    // il n'utilise pas le bouton d'ouverture de renderModal.
    it("displays the modal content when 'opened' prop is true", () => {
      render(
        <Modal opened Content={modalContent}>
          {/* On passe une fonction vide car on n'a pas besoin du déclencheur ici */}
          {() => null}
        </Modal>
      );
      expect(screen.getByText("modal content")).toBeInTheDocument();
    });
  });

  describe("When a click is triggered to display the modal", () => {
    it("should display the modal content after clicking the open button", async () => {
      // renderModal utilise maintenant le bouton corrigé qui appelle setIsOpened
      const { getByTestId, queryByText } = renderModal();

      // Vérification initiale : le contenu ne doit pas être là
      expect(queryByText("modal content")).not.toBeInTheDocument();

      // Cliquer sur le bouton rendu par la fonction children corrigée
      fireEvent.click(getByTestId("open-modal"));

      // Attendre que le contenu apparaisse dans le DOM après la mise à jour de l'état
      await waitFor(() => {
        expect(screen.getByText("modal content")).toBeInTheDocument();
      });

      // Alternative plus concise avec findByText:
      // const modalElement = await screen.findByText("modal content");
      // expect(modalElement).toBeInTheDocument();
    });
  });

  describe("When a click is triggered on the close button", () => {
    // Ce test vérifie le bouton de fermeture interne à la modale.
    it("should hide the modal content", async () => {
      // On rend la modale initialement ouverte
      const { queryByText } = renderModal({ opened: true });

      // Vérification initiale : le contenu doit être présent
      expect(screen.getByText("modal content")).toBeInTheDocument();

      // Cliquer sur le bouton de fermeture interne au composant Modal
      // Ce bouton a le data-testid="close-modal" défini dans Modal/index.js
      fireEvent.click(screen.getByTestId("close-modal"));

      // Attendre que le contenu disparaisse du DOM
      await waitFor(() => {
        expect(queryByText("modal content")).not.toBeInTheDocument();
      });
    });
  });
});