import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {
  Button,
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Input
} from 'reactstrap';
import { signinUser, removeAuthError } from '../../actions/auth';

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
class Signin extends Component {
  handleFormSubmit(values) {
    this.props.signinUser(values);
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
            <strong>Sign in</strong>
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
            type="password"
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
            Dont have an account? <Link to="/signup">Sign up now</Link>{' '}
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

  if (values.password && values.password.length < 6) {
    errors.password = 'Password must at least 6 characters';
  }
  // errors is empty, the form is fine to submit
  // if errors has any properties, redux form assumes form is invalid
  return errors;
}

function mapStateToProps(state) {
  return {
    error: state.auth.error,
    authenticated: state.auth.authenticated
  };
}

export default reduxForm({
  form: 'signin',
  fields: ['username', 'password'],
  validate
})(
  connect(
    mapStateToProps,
    { signinUser, removeAuthError }
  )(Signin)
);
