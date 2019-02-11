import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DashboardItem from './DashboardItem';
import { getAllInquiry } from '../../actions/inquiryAction';
import Spinner from '../common/Spinner';
class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      auth: {},
      inquiry: null
    }
  }
  componentWillMount() {
    this.props.getAllInquiry(this.props.auth.user.email);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.inquiry) {
      this.setState({ inquiry: nextProps.inquiry });
    }
  }
  render() {
    let dashboardContent;
    const { user } = this.props.auth;
    const { inquiry } = this.state;
    if (inquiry === null) {
      dashboardContent = <Spinner />;
    } else {
      if (inquiry.length === 0) {
        dashboardContent = (<div>
          <p>You have not inquiry make yet for explore</p>
          <Link to="/listing">Listing</Link>
          <br></br><br></br>
        </div>)
      } else {
        dashboardContent = (<div>
          <table className="highlight">
            <thead>
              <th>#</th>
              <th>Proparty</th>
              <th></th>
            </thead>
            <tbody className="grey-text text-darken-3">
              {inquiry.map((inq, i) => <DashboardItem inq={inq} i={i}/>)}
            </tbody>
          </table>
        </div>);
      }
    }
    return (
      <div>
        <div className="showcase-dashboard">
          <div className="showcase-dashboard-overlay">
          </div>
          <div className="showcase-dashboard-content">
            <h3>User Dashboard</h3>
            <p>Manage you BT Reatstate account</p>
          </div>
        </div>
        {/* Breadcrumb */}
        <div class="container">
        <br></br>
          <nav class="grey lighten-2 z-depth-0">
            <div class="container">
              <div class="nav-wrapper">
                <Link to="/" class="breadcrumb  grey-text text-darken-1"><i class="material-icons">home</i> Home</Link>
                <Link to="/dashboard" class="breadcrumb grey-text text-darken-3">Dashboard </Link>
              </div>
            </div>
          </nav>
          {/* welcome */}
          <h4>Welcome <span className="teal-text">{ user.name}</span></h4>
          <p>Here are the proparty listing that you have inquiry about</p>
          <br></br>
          {dashboardContent}
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  inquiry: state.inquiry,
  auth: state.auth
});
export default connect(mapStateToProps, { getAllInquiry })(Dashboard);