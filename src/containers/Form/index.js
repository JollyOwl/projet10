
    import { useCallback, useState } from "react";
    import PropTypes from "prop-types";
    import Field, { FIELD_TYPES } from "../../components/Field";
    import Select from "../../components/Select";
    import Button, { BUTTON_TYPES } from "../../components/Button";
    
    const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 500); })
    
    const Form = ({ onSuccess, onError }) => {
      const [sending, setSending] = useState(false);
      const [confirmationMessage, setConfirmationMessage] = useState("");
    
      const sendContact = useCallback(
        async (evt) => {
          evt.preventDefault();
          setSending(true);
          setConfirmationMessage("");
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
    
      return (
        <form onSubmit={sendContact}>
          <div className="row">
            <div className="col">
              <Field placeholder="" label="Nom" name="name"/>
              <Field placeholder="" label="Prénom" name="firstname"/>
              <Select
                selection={["Personel", "Entreprise"]}
                onChange={() => null}
                label="Personel / Entreprise"
                type="large"
                titleEmpty
              />
              <Field placeholder="Votre email" aria-label="Email" label="Email" name="Email"/>
              <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
                {sending ? "En cours" : "Envoyer"}
              </Button>
            </div>
            <div className="col">
              <Field
                placeholder="message"
                label="Message"
                type={FIELD_TYPES.TEXTAREA}
                name="message"
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
