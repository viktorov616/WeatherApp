import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function InputGroup({
  btnName, input, isFetching, meta: { active, error, touched }, type,
}) {
  function showInvalid() {
    return touched && error && !active;
  }

  const hasError = showInvalid();
  return (
    <div style={{ minHeight: '75px' }}>
      <div
        style={{ marginBottom: '5px' }}
        className={classNames('input-group', 'input-group-lg', { 'has-error': hasError })}
      >
        <input {...input} type={type} className="form-control" />
        <span className="input-group-btn">
          <button
            type="submit"
            className="btn btn-default"
            style={{
              minWidth: '115px',
              paddingLeft: '0',
              textAlign: 'right',
              ...((hasError) ? { borderColor: '#a94442' } : {}) }}
          >
            <ReactCSSTransitionGroup
              transitionName="animation-simple-fade"
              transitionEnterTimeout={200}
              transitionLeaveTimeout={200}
            >
              { isFetching && <i className="icon-spinner animate-spin" /> }
            </ReactCSSTransitionGroup>
            <span> {btnName}</span>
          </button>
        </span>
      </div>
      { hasError &&
        <span style={{ paddingLeft: '20px' }} className="text-danger">{ error }</span> }
    </div>
  );
}

InputGroup.propTypes = {
  btnName: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    active: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    touched: PropTypes.bool.isRequired,
  }).isRequired,
};
