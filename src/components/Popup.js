import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CloseBtn from './CloseBtn';

export default class Confirm extends Component {
  constructor(props) {
    super(props);
    this.handleHotkeys = this.handleHotkeys.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleHotkeys);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleHotkeys);
  }

  handleHotkeys(e) {
    if (e.keyCode === 13) {
      this.props.ok();
    } else if (e.keyCode === 27) {
      this.props.close();
    }
  }

  render() {
    const { close, header, headerClass, ok, text } = this.props;
    const wrapperStyle = {
      position: 'fixed',
      left: '0',
      top: '0',
      width: '100%',
      height: '100%',
      zIndex: '10',
    };
    const confirmStyle = {
      border: '1px solid #000',
      borderRadius: '5px',
      padding: '10px',
      paddingBottom: '20px',
      marginTop: '20%',
      backgroundColor: '#fff',
    };
    const textStyle = {
      marginTop: '20px',
      marginBottom: '25px',
      fontSize: '24px',
    };

    return (
      <div style={wrapperStyle}>
        <div
          style={confirmStyle}
          className="col-xs-8 col-xs-offset-2 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4"
        >
          <div className="clearfix text-center" style={{ position: 'relative' }}>
            <p
              className={headerClass}
              style={{ fontSize: '24px', marginTop: '5px', marginBottom: '0' }}
            >
              { header }
            </p>
            <CloseBtn onClick={close} style={{ position: 'absolute', right: '10px', top: '10px' }} />
          </div>
          <p style={textStyle} className="text-center">{ text }</p>
          <div className="text-center">
            <button
              onClick={ok}
              type="button"
              className="btn btn-primary"
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Confirm.propTypes = {
  close: PropTypes.func.isRequired,
  header: PropTypes.string,
  headerClass: PropTypes.string,
  ok: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

Confirm.defaultProps = {
  header: '',
  headerClass: '',
};
