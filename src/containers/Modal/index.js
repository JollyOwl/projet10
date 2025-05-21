import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Icon from "../../components/Icon";
import "./style.scss";

const Modal = ({ opened: localDefaultOpened, Content, children, onClose }) => {

  // On crée un état local pour gérer l'ouverture/fermeture du modal
  // localValueOpened est une prop transmis par EventList (Modla)
  const [locaValueOpened, localIsOpened] = useState(localDefaultOpened);

  // UseEffect s'execute à chaque fois que la valeur de localDefaultOpened change
  useEffect(() => {
    localIsOpened(localDefaultOpened);
  }, [localDefaultOpened]);

  const handleClose = () => {
    localIsOpened(false);
    if (onClose) onClose();
  };

  return (
    <>
      {typeof children === "function" ? children({ isOpened: locaValueOpened, setIsOpened: localIsOpened }) : null}
      {locaValueOpened && (
        <div
          className="modal"
          role="dialog"
          aria-modal="true"
          data-testid="modal-testid"
        >
          <div className="content">
            {Content}
            <button
              type="button"
              data-testid="close-modal"
              onClick={handleClose}
            >
              <Icon name="close" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

Modal.defaultProps = {
  opened: false,
  onClose: () => null,
}

Modal.propTypes = {
  opened: PropTypes.bool,
  Content: PropTypes.node.isRequired,
  children: PropTypes.func.isRequired,
  onClose: PropTypes.func,
}

export default Modal;
