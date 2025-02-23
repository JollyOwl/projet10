import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "./index";

describe("and a click is triggered on the submit button", () => {
  it("the success message is displayed", async () => {
    render(<Home />);

    // Attendre que le formulaire apparaisse en vérifiant un champ (ex : Email)
    await screen.findByText("Email");

    // Récupérer le bouton
    const submitButton = await screen.findByRole("button", { name: /envoyer/i });

    // Simuler le clic
    fireEvent.click(submitButton);

    // Vérifier que "En cours" apparaît après le clic
    await screen.findByText("En cours");

    // Vérifier que "Message envoyé !" apparaît après la soumission
    await waitFor(() => expect(screen.getByText("Message envoyé !")).toBeInTheDocument());
  });
});
