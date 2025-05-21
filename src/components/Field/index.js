import PropTypes from "prop-types";

import "./style.scss";

export const FIELD_TYPES = {
  INPUT_TEXT: 1,
  TEXTAREA: 2,
};

const Field = ({ type = FIELD_TYPES.INPUT_TEXT, label = "", name, placeholder, onChange, required = false }) => {
  let component;
  const id = `field-${name}`;
  switch (type) {
    case FIELD_TYPES.INPUT_TEXT:
      component = (
        <input
          type="text"
          name={name}
          id={id}
          placeholder={placeholder}
          onChange={onChange}
          required={required}
          data-testid="field-testid"
        />
      );
      break;
    case FIELD_TYPES.TEXTAREA:
      component = <textarea name={name} id={id} placeholder={placeholder} required={required} data-testid="field-testid" />;
      break;
    default:
      component = (
        <input
          type="text"
          name={name}
          id={id}
          placeholder={placeholder}
          onChange={onChange}
          required={required}
          data-testid="field-testid"
        />
      );
  }
  return (
    <div className="inputField">
      {label && <label htmlFor={id}>{label}</label>}
      {component}
    </div>
  );
};

Field.propTypes = {
  type: PropTypes.oneOf(Object.values(FIELD_TYPES)),
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
};

Field.defaultProps = {
  placeholder: "",
  type: FIELD_TYPES.INPUT_TEXT,
  label: "",
  onChange: () => {},
  required: false,
};

export default Field;