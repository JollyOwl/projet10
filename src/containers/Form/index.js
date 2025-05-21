import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 500); })

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  /* 1. FONCTION DE SOUMISSION DU FORMULAIRE */
  // La fonction est une fonction de rappel qui est appelée lorsque le formulaire est soumis
  const sendContact = useCallback(

    async (evt) => {
      evt.preventDefault();
      // active l'état de chargement 
      setSending(true);
      try {
        await mockContactApi();
        setSending(false);
        setConfirmationMessage("Message envoyé !");
        onSuccess();
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError]
  );

  /* 2. RENDU */
  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="Nom" label="Nom" name="name" required data-testid="field-testid" />
          <Field placeholder="Prenom" label="Prénom" name="firstname" required data-testid="field-testid" />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
            required
            data-testid="select-testid"
            id="select-testid"
          />
          <Field placeholder="Email" label="Email" name="Email" required data-testid="field-testid" />
          <Button data-testid="button-test-id" type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="Message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
            name="message"
            required
            data-testid="field-testid"
          />
        </div>
      </div>
      {confirmationMessage && <p>{confirmationMessage}</p>}
    </form>
  );

};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
}

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
}

export default Form;
