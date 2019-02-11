import React, { Component } from 'react'
import { connect } from 'react-redux';
import Materialize from 'materialize-css';
import TextInput from '../../common/TextInput';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { removeErrors } from '../../../actions/authAction';
import { getAllUsers, registerUserFromAdmin } from '../../../actions/userAction';
import Spinner from '../../common/Spinner';
import UsersItem from './UsersItem';

class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {},
      auth: {},
      user: {},
      perPage: 8,
      totalPage: null,
      currentPage: 1,
      userResponse: null
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handlePage = this.handlePage.bind(this);
    this.chevron_left_click = this.chevron_left_click.bind(this);
    this.chevron_right_click = this.chevron_right_click.bind(this);
  }
  componentWillMount() {
    this.props.removeErrors();
    this.props.getAllUsers();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userResponse) {
      this.setState({ userResponse: nextProps.userResponse });
    }
    if (nextProps.auth) {
      this.setState({ auth: nextProps.auth });
      // Init modal
      setTimeout(() => {
        const modalElem = document.querySelectorAll('.modal');
        document.getElementById('add-user')
        Materialize.Modal.init(modalElem, {
          onCloseEnd: function(){
            document.body.style.overflow = null;
          }
        });
      }, 1000)
    }
    if (nextProps.errors) {
      const errors = nextProps.errors;
      this.setState({ errors: nextProps.errors });
      if (errors.name !== undefined || errors.email !== undefined || errors.password || errors.password2 !== undefined) {
        Materialize.toast({ html: 'Validate Error Try Again', displayLength: 2000 });
        setTimeout(() => {
          const elem = document.getElementById('add-user');
          const instance = Materialize.Modal.getInstance(elem);
          instance.open();
        }, 1000)
      }
    }
    if (nextProps.users) {
      this.setState({ users: nextProps.users.users });
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
    this.props.registerUserFromAdmin(newUser);
    e.preventDefault();
  }
  handlePage(e) {
    this.props.removeErrors();
    this.setState({ currentPage: e.target.id });
  }
  chevron_left_click() {
    if (this.state.currentPage !== 1) {
      this.props.removeErrors();
      this.setState({ currentPage: this.state.currentPage - 1 });
    }
  }
  chevron_right_click() {
    if (this.state.currentPage !== Math.ceil(this.state.users.length / this.state.perPage)) {
      this.props.removeErrors();
      this.setState({ currentPage: Number.parseInt(this.state.currentPage) + 1 });
    }
  }

  render() {
    const { errors, users, perPage, currentPage, trigger, userResponse } = this.state;
    // const { user } = this.state;
    let usersContent;
    if (users[0] === undefined) {
      usersContent = <Spinner />;
    } else {
      if (users.length === 0) {
        usersContent = <p>No user found</p>;
      } else {

        //on error
        if (Object.keys(errors).length > 0 && trigger) {
          setTimeout(() => {
            const elem = document.getElementById('add-user');
            const instance = Materialize.Modal.getInstance(elem);
            instance.open();
            Materialize.Modal.init(elem, {})
          }, 1000);
        }
        // on user added
        if (userResponse.success) {
          Materialize.toast({ html: 'user added', displayLength: 2000 });
          this.setState({ name: '', email: '', password: '', password2: '' });
          this.props.getAllUsers();
          userResponse.success = false;
        }
        // logic for display users
        let indexOfLastUser = currentPage * perPage;
        let indexOfFirstUser = indexOfLastUser - perPage;
        let currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
        let pageNumbers = [];
        let index = 0;
        for (let i = 1; i <= Math.ceil(users.length / perPage); i++) {
          pageNumbers[index] = i;
          index++;
        }
        // if email taken already
        usersContent =
          (<div>
            <section className="container">
              <div className="">
                <div className="row">
                  <div className="col s12 m9">
                    <br></br>
                    <Link to="/admin/home" className="btn grey lighten-4 z-depth-0 grey-text text-darken-4">Back To Home</Link>
                    <br></br>
                    <br></br>
                    <br></br>
                    <p className="flow-text" style={{ margin: '0' }}>All the users</p>
                    <table className="striped grey-text text-darken-1">
                      <thead>
                        <tr>
                          <th>S. No.</th>
                          <th>NAME</th>
                          <th>EMAIL</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          currentUsers.map((user, i) => <UsersItem key={i} user={user} i={indexOfFirstUser + 1 + i} />)
                        }
                      </tbody>
                    </table>
                    {/* pagination */}
                    <p>{users.length} contacts</p>
                    {users.length > 8 ? (
                      <ul className="pagination">
                        <li className={classnames('', { 'disabled': (currentPage === 1) })}>
                          <a href="#!" onClick={this.chevron_left_click}>
                            <i className="material-icons">chevron_left</i>
                          </a>
                        </li>
                        {
                          pageNumbers.map((page, index) =>
                            <li className={classnames('', { 'active': page === currentPage })} key={page}>
                              <a
                                href="#!"
                                id={page}
                                onClick={this.handlePage}
                              >
                                {page}
                              </a>
                            </li>
                          )
                        }
                        <li className={classnames('', { 'disabled': (currentPage === pageNumbers.slice(-1)[0]) })}>
                          <a href="#!" onClick={this.chevron_right_click}>
                            <i className="material-icons">chevron_right</i>
                          </a>
                        </li>
                      </ul>
                    ) : null}
                  </div>
                  <div className="col s12 m3 center">
                    <br></br>
                    <br></br>
                    <div className="chip">
                      <a href="#add-user" className="modal-trigger grey-text"><i className="fas fa-plus"></i> Add More </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* add-user modal */}
            <div id="add-user" className="modal">
              <div className="modal-content">
                <h4 className="center grey-text text-darken-3"><i className="fas  fa-user-plus"></i>&nbsp;Register</h4>
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
                    type="text"
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
                  <br></br>
                  <input
                    type="submit"
                    className="btn"
                    value="Registe"
                    style={{ width: '100%' }}
                  />
                </form>
              </div>
            </div>
          </div>);
      }
    }
    return (
      <div>
        {usersContent}
      </div>)
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  users: state.user,
  errors: state.errors,
  userResponse: state.userResponse
});
export default connect(mapStateToProps, { getAllUsers, registerUserFromAdmin, removeErrors })(Users);
