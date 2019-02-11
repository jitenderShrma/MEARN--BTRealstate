import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import M from 'materialize-css';
import PropTypes from 'prop-types';
import { logoutUser, logoutAdmin } from '../../actions/authAction';
class Navbar extends Component {

  componentDidUpdate() {
    M.Sidenav.init(document.getElementById('admin-sidenav'), {});
  }

  onLogoutClick = () => {
    this.props.logoutUser();
  }
  onLogoutAdminClick = () => {
    this.props.logoutAdmin();
  }
  onSidenavClick = function () {
    setTimeout(function () {
      M.Sidenav.init(document.getElementById('admin-sidenav'), {})
      alert(true);
    }, 1000)
  }
  
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const guestUser = (
      <div className="Navbar">
        <a href="#!" className="dropdown-trigger" data-target="dropdown"><i className="material-icons left">arrow_drop_down</i> User</a>
        {/* dropdown */}
        <ul id="dropdown" className="dropdown-content">
          <li><Link to="/register"> <i className="fas fa-user-plus"></i>Register</Link></li>
          <li><Link to="/login"><i className="fas fa-user"></i> Login</Link></li>
        </ul>
      </div>
    );
    const authUser = (
      <div>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <a href="#!" onClick={this.onLogoutClick}>
            <div className="chip transparent white-text">
              <img src={user.avatar} alt='' title={user.name} />Logout
            </div>
          </a>
        </li>
      </div>
    );
    const sidenavOnAuth = (
      <div>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <a href="#!" onClick={this.onLogoutClick}>
            <div className="chip transparent">
              <img src={user.avatar} alt='' title={user.name} />Logout
            </div>
          </a>
        </li>
      </div>
    );
    const sidenavOnGuest = (
      <ul>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    );
    return (
      <div className="navbar-main">
        {!user.isAdmin === true ? (<div>
          <header>
            <div className="container">
              <p className="center">
                <span className="left"><i className="fas fa-phone"></i>&nbsp; 01282-274751</span>
                <span>
                  <i className="far fa-envelope"></i>&nbsp; jitenderkanti@gmail.com
              </span>
                <span className="right hide-on-small-only">
                  <a href="#!"><i className="fab fa-facebook teal-text"></i> &nbsp;&nbsp;</a>
                  <a href="#!"><i className="fab fa-youtube teal-text"></i> &nbsp;&nbsp;</a>
                  <a href="#!"><i className="fab fa-instagram teal-text"></i> &nbsp;&nbsp;</a>
                  <a href="#!"><i className="fab fa-linkedin teal-text"></i></a>
                </span>
              </p>
            </div>
            <nav className="teal darken-1">
              <div className="nav-wrapper">
                <div className="container">
                  <Link to="/" className="brand-logo">BT Realstate</Link>
                  <a href="#!" className="sidenav-trigger" data-target="mobile-nav"><i className="material-icons">menu</i></a>
                  <ul className="right hide-on-med-and-down">
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/about">About</Link>
                    </li>
                    <li>
                      <Link to="/listing">Featured Listing</Link>
                    </li>
                    <li>
                      {isAuthenticated === true ? authUser : guestUser}
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            {/* slidenav */}
            <ul className="sidenav" id="mobile-nav">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/listing">Featured Listing</Link>
              </li>
              <li>
                {isAuthenticated === true ? sidenavOnAuth : sidenavOnGuest}
              </li>
            </ul>
          </header>
        </div>) : (<div>
          <nav className="teal darken-3">
            <div className="nav-wrapper">
              <div className="container">
                <a href="#!" className="brand-logo">BTRealstate <span className="hide-on-small-only">Admin area</span></a>
                <a href="#!" className="sidenav-trigger" data-target="admin-sidenav"><i className="material-icons">menu</i></a>
                <ul className="right hide-on-med-and-down">
                  <li>
                  <a href="#!" onClick={() => this.props.onLogoutAdminClick }>
                  <Link to="/">Visit Site</Link>
                  </a>                   
                  </li>
                  <li>
                    <Link to="/changePassword">Change Password</Link>
                  </li>
                  <li>
                    <a
                    href="#!"
                    onClick={this.onLogoutAdminClick}
                    >Logout</a>
                  </li>
                </ul>
                <ul className="sidenav" id="admin-sidenav">
                  <li onClick={() => this.props.onLogoutAdminClick }>
                    <a
                    href="#!"
                    onClick={() => this.props.onLogoutAdminClick }
                    >
                    <Link to="/">Visit Site</Link>
                    </a>
                  </li>
                  <li>
                    <Link to="/changePassword">Change Password</Link>
                  </li>
                  <li>
                    <a href="#!" onClick={this.onLogoutAdminClick}>Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div style={{ display: 'none' }}>
          </div>
        </div>)}
      </div>
    )

  }
}

const mapStateToProps = state => ({
  auth: state.auth
});
Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
}
export default connect(mapStateToProps, { mapStateToProps, logoutUser, logoutAdmin })(Navbar);