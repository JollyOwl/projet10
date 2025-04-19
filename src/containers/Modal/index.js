import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Icon from "../../components/Icon";
import "./style.scss";

const Modal = ({ opened, Content, children, onClose }) => {
  const [isOpened, setIsOpened] = useState(opened);

  useEffect(() => {
    // Si la prop `opened` change, mettez à jour l'état du modal
    if (opened !== isOpened) {
      setIsOpened(opened);
    }
  }, [opened, isOpened]); // Assurez-vous que l'état change uniquement si la prop change

  const handleClose = () => {
    setIsOpened(false);
    if (onClose) onClose();
  };

  return (
    <>
      {typeof children === "function" ? children({ isOpened, setIsOpened }) : null}
      {isOpened && (
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
};

Modal.propTypes = {
  opened: PropTypes.bool,
  Content: PropTypes.node.isRequired,
  children: PropTypes.func.isRequired,
  onClose: PropTypes.func,
};

export default Modal;
