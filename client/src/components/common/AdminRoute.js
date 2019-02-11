import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
const AdminRoute = ({ component: Component, auth, ...rest }) => (
  <Route {...rest} render={props => (
    auth.user.isAdmin === true ? (<Component {...props} />) :
      (<Redirect to="/admin" />)
  )} />

);
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(AdminRoute);