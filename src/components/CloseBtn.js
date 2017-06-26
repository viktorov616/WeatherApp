import React from 'react';
import PropTypes from 'prop-types';

export default function CloseBtn({ onClick, size, style }) {
  return (
    <button
      type="button"
      style={style}
      className="close"
      aria-label="Close"
      onClick={onClick}
    >
      <span style={{ fontSize: `${size}px` }} aria-hidden="true">&times;</span>
    </button>
  );
}

CloseBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
  size: PropTypes.string,
  style: PropTypes.object,
};

CloseBtn.defaultProps = {
  size: '16px',
  style: {},
};
