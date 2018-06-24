import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUser } from '../actions/auth';

export default function(ComposedComponent) {
  class Authentication extends Component {
    UNSAFE_componentWillMount() {
      if (!this.props.authenticated) {
        this.props.history.push('/signin');
      } else {
        if (!this.props.user) {
          this.props.getUser();
        }
      }
    }

    UNSAFE_componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.props.history.push('/signin');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated, user: state.auth.user };
  }

  return withRouter(
    connect(
      mapStateToProps,
      { getUser }
    )(Authentication)
  );
}
