import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import Materialize from 'materialize-css';
import ContactItem from './ContactItem';
import Spinner from '../../common/Spinner';
import { getAllUserInquiry, deleteInquiry } from '../../../actions/inquiryAction';

class Contact extends Component {
  constructor() {
    super();
    this.state = {
      inquirys: null,
      name: '',
      email: '',
      phone: '',
      message: '',
      realter: '',
      errors: {},
      auth: {},
      perPage: 8,
      totalPage: null,
      currentPage: 1,
      userResponse: null
    }
    this.onDelete = this.onDelete.bind(this);
    this.handlePage = this.handlePage.bind(this);
    this.chevron_left_click = this.chevron_left_click.bind(this);
    this.chevron_right_click = this.chevron_right_click.bind(this);
  }
  componentDidMount() {
    this.props.getAllUserInquiry();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth) {
      this.setState({ auth: nextProps.auth });
      //Init modal
      setTimeout(() => {
        const modalElem = document.querySelectorAll('.modal');
        document.getElementById('add-user')
        Materialize.Modal.init(modalElem, {});
      }, 1000)
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.inquirys) {
      this.setState({ inquirys: nextProps.inquirys });
    }
  }

  onDelete(id) {
    this.props.deleteInquiry(id);
    this.props.getAllUserInquiry();
  }

  handlePage(e) {
    this.setState({ currentPage: e.target.id });
  }

  chevron_left_click() {
    if (this.state.currentPage !== 1) {
      this.setState({ currentPage: this.state.currentPage - 1 });
    }
  }

  chevron_right_click() {
    if (this.state.currentPage !== Math.ceil(this.state.inquirys.length / this.state.perPage)) {
      this.setState({ currentPage: Number.parseInt(this.state.currentPage) + 1 });
    }
  }

  render() {
    const { inquirys, perPage, currentPage } = this.state;
    let inquiryContact;
    if (inquirys === null) {
      inquiryContact = <Spinner />;
    } else {
      if (inquirys.length === 0) {
        inquiryContact = <p>No contact found</p>;
      } else {
        //logic for display inquiry 
        let indexOfLastinquiry = currentPage * perPage;
        let indexOfFirstinquiry = indexOfLastinquiry - perPage;
        let currentInquiry = inquirys.slice(indexOfFirstinquiry, indexOfLastinquiry);
        let pageNumbers = [];
        let index = 0;
        for (let i = 1; i <= Math.ceil(inquirys.length / perPage); i++) {
          pageNumbers[index] = i;
          index++;
        }
        //if email taken already
        inquiryContact =
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
                    <p className="flow-text" style={{ margin: '0' }}>All the contacts</p>
                    <table className="striped grey-text text-darken-1">
                      <thead>
                        <tr>
                          <th>S. No.</th>
                          <th>NAME</th>
                          <th>LISTING</th>
                          {/* <th>EMAIL</th> */}
                          <th>CONTACT DATE</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          currentInquiry.map((inqu, i) => <ContactItem inqu={inqu} i={indexOfFirstinquiry + 1 + i} onDelete={this.onDelete} key={inqu._id} />)
                        }
                      </tbody>
                    </table>
                    {/* pagination */}
                    <p>{inquirys.length} inquirys</p>
                    {inquirys.length > 8 ? (
                      <ul className="pagination">
                        <li className={classnames('', { 'disabled': (currentPage === 1) })}>
                          <a href="#!" onClick={this.chevron_left_click}>
                            <i className="material-icons">chevron_left</i>
                          </a>
                        </li>
                        {
                          pageNumbers.map(page =>
                            <li className={classnames('', { 'active': page === currentPage })}>
                              <a
                                href="#!"
                                key={page}
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
                </div>
              </div>
            </section>
          </div>);
      }
    }
    return (
      <div>
        {inquiryContact}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  inquirys: state.inquiry
});
export default connect(mapStateToProps, { getAllUserInquiry, deleteInquiry })(Contact);