import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import InputGroup from './InputGroup';

function SearchBar({ handleSubmit, isFetching }) {
  return (
    <form onSubmit={handleSubmit}>
      <Field
        btnName="Search"
        component={InputGroup}
        isFetching={isFetching}
        name="query"
        type="text"
      />
    </form>
  );
}

SearchBar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

function validate(values) {
  const errors = {};

  if (!values.query) {
    errors.query = 'Required';
  }

  return errors;
}

const searchBar = reduxForm({
  form: 'serachBar',
  validate,
})(SearchBar);

export default searchBar;
