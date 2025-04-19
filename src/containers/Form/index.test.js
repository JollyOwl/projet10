import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Form from "./index";

describe("When Events is created", () => {
  it("displays the list of event cards", async () => {
    render(<Form />);
    await waitFor(() => {
      expect(screen.getByText("Email")).toBeInTheDocument();
      expect(screen.getByText("Nom")).toBeInTheDocument();
      expect(screen.getByText("Prénom")).toBeInTheDocument();
      expect(screen.getByText("Personel / Entreprise")).toBeInTheDocument();
    });
  });

  describe("when a click is triggered on the submit button", () => {
    it("calls the success action", async () => {
      const onSuccess = jest.fn();
      render(<Form onSuccess={onSuccess} />);
  
      fireEvent.click(await screen.findByTestId("button-test-id"));
  
      expect(await screen.findByText("En cours")).toBeInTheDocument();
      expect(await screen.findByText("Envoyer")).toBeInTheDocument();
      expect(onSuccess).toHaveBeenCalled();
    });
  });
  
});
