import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';
import { registerUser } from '../../actions/authAction';
class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onChange = function (e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit = function (e) {
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }

    this.props.registerUser(newUser, this.props.history);
    e.preventDefault();
  }
  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col s12 m4 offset-m4" style={{ marginTop: '100px', marginBottom: '60px' }}>
            <div className="card-panel">
              <h4 className="center"><i className="fas  fa-user-plus "></i>&nbsp;Register</h4>
              <form noValidate="novalidate" onSubmit={this.onSubmit}>
                <TextInput
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  id="name"
                  labelText="Name"
                  error={errors.name}
                />
                {errors.name !== undefined ? <br></br> : null}
                <TextInput
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  id="email"
                  labelText="Email"
                  error={errors.email}
                />
                {errors.email !== undefined ? <br></br> : null}
                <TextInput
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  id="password"
                  labelText="Password"
                  error={errors.password}
                />
                {errors.password !== undefined ? <br></br> : null}
                <TextInput
                  type="password"
                  name="password2"
                  value={this.state.password2}
                  onChange={this.onChange}
                  id="password2"
                  labelText="Conform password"
                  error={errors.password2}
                />
                <input
                  type="submit"
                  className="btn"
                  value="Registe"
                  style={{ width: '100%' }}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  errors: state.errors
});
Register.propTypes = {
  errors: PropTypes.object.isRequired
}
export default connect(mapStateToProps, { registerUser })(Register);