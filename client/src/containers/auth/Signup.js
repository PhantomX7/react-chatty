import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import {
  Button,
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Input
} from 'reactstrap';
import { signupUser, removeAuthError } from '../../actions/auth';

const renderField = ({ input, label, type, meta: { touched, error } }) => {
  return (
    <FormGroup>
      <Label>{label}</Label>
      <Input type={type} invalid={touched && error ? true : false} {...input} />
      <FormFeedback>{touched ? error : ''}</FormFeedback>
    </FormGroup>
  );
};

/* eslint-disable max-len */
class Signup extends Component {
  constructor(props) {
    super(props);
  }

  handleFormSubmit({ username, password }) {
    this.props.signupUser({ username, password });
  }

  renderError() {
    const { error, removeAuthError } = this.props;
    if (error) {
      setTimeout(removeAuthError, 5000);
      return <div className="text-danger">{this.props.error}</div>;
    }
    return <div />;
  }

  render() {
    const { handleSubmit, authenticated } = this.props;

    if (authenticated) {
      return <Redirect to="/" />;
    }

    return (
      <div className="container">
        <div className="text-center">
          <h3 className="pt-3">
            <strong>Sign Up</strong>
          </h3>
        </div>
        <Form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Field
            name="username"
            component={renderField}
            label="Username"
            type="text"
          />
          <Field
            name="password"
            component={renderField}
            label="Password"
            type="Password"
          />
          <Field
            name="confirm_password"
            component={renderField}
            label="Confirm Password"
            type="Password"
          />
          <div className="text-center">
            {this.renderError()}

            <Button
              className="btn btn-default button-rounded-primary w-100 mt-3 mb-2"
              action="submit"
            >
              Sign in
            </Button>
          </div>
          <div className="py-3">
            Already have an account? <Link to="/signin">Sign in now</Link>{' '}
          </div>
        </Form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.username) {
    errors.username = 'Please enter an username';
  }

  if (!values.password) {
    errors.password = 'Please enter a password';
  }

  if (!values.confirm_password) {
    errors.confirm_password = 'Please enter a confirm password';
  }

  if (values.password && values.password.length < 6) {
    errors.password = 'Password must at least 6 characters';
  }

  if (values.password && values.password !== values.confirm_password) {
    errors.confirm_password = 'Please enter same password';
  }
  // errors is empty, the form is fine to submit
  // if errors has any properties, redux form assumes form is invalid
  return errors;
}

function mapStateToProps(state) {
  return {
    error: state.auth.error,
    authenticated: state.auth.authenticated,
    loading: state.auth.loading
  };
}

export default reduxForm({
  form: 'register',
  validate
})(
  connect(
    mapStateToProps,
    {
      signupUser,
      removeAuthError
    }
  )(Signup)
);
