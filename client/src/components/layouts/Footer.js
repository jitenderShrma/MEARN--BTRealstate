import React, { Component } from 'react';
import { connect } from 'react-redux';
class Footer extends Component {
  render() {
    const { user } = this.props.auth;
    
    return (
      <div>{
        user.isAdmin ? ('') : (<div>
          <div className="footer">
            <footer className="teal white-text darken-3">
              <div className="footer-copyright" style={{ padding: '1em 0' }}>
                <div className="container">
                  © 2019 BT Realstate
              <a href="#!" className="grey-text text-lighten-4 right">Terms & Conditions</a>
                </div>
              </div>
            </footer>
          </div>
        </div>)
      }</div>
    )
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(Footer);