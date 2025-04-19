import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Icon from "../../components/Icon";
import "./style.scss";

const Modal = ({ opened, Content, children, onClose }) => {
  const [isOpened, setIsOpened] = useState(opened);

  useEffect(() => {
    setIsOpened(opened);
  }, [opened]);

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
}

Modal.propTypes = {
  opened: PropTypes.bool,
  Content: PropTypes.node.isRequired,
  children: PropTypes.func.isRequired,
  onClose: PropTypes.func,
}

export default Modal;
