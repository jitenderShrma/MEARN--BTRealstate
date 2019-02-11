import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginAdminUser } from '../../actions/authAction';
import TextInput from '../common/TextInput';
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onSubmit = function (e) {

    const userData = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.loginAdminUser(userData, this.props.history);
    e.preventDefault();
  }
  onChange = function (e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className="row">
          <br></br>
          <br></br>
          <br></br>
          <div className="col s10 m4 offset-m4 offset-s1 center">
            <div className="card">
              <div className="flow-text"><i className="fas fa-unlock-alt"></i> Admin</div>
              <div className="card-content">
                <form onSubmit={this.onSubmit} >
                  <TextInput
                    type='email'
                    name='email'
                    onChange={this.onChange}
                    value={this.state.email}
                    id='email'
                    labelText='Email'
                    error={errors.email}
                  />
                  {errors.email !== undefined ? <br></br> : null}
                  <TextInput
                    type='password'
                    name='password'
                    onChange={this.onChange}
                    value={this.state.password}
                    id='password'
                    labelText='Password'
                    error={errors.password}
                  />
                  <br></br>
                  <input type="submit" className="btn" value="Login" style={{ width: '100%' }} />
                </form>
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  errors: state.errors
});
export default connect(mapStateToProps, { loginAdminUser })(Login);
