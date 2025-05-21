import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Form from "./index";

describe("When Form is created", () => {
  it("affiche les champs du formulaire de contact", () => {
    render(<Form />);
    expect(screen.getByLabelText("Nom")).toBeInTheDocument();
    expect(screen.getByLabelText("Prénom")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
    expect(screen.getByTestId("select-testid")).toBeInTheDocument();

  });
  

  describe("when a click is triggered on the submit button", () => {
    it("calls the success action", async () => {
      const onSuccess = jest.fn();
      render(<Form onSuccess={onSuccess} />);
  
      fireEvent.click(await screen.findByTestId("button-test-id"));
  
      // pendant le chargement
      expect(await screen.findByText("En cours")).toBeInTheDocument();
  
      // après la soumission
      await waitFor(() => expect(onSuccess).toHaveBeenCalled());
      expect(await screen.findByText("Message envoyé !")).toBeInTheDocument();
    });
  });
  
  
});
