import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import Materialize from 'materialize-css';
import RealterItem from './RealterItem';
import Spinner from '../../common/Spinner';
import { getRealters, deleteRealter } from '../../../actions/realterAction';

class Contact extends Component {
  constructor() {
    super();
    this.state = {
      realters: null,
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
      userResponse: null,
      loading: true
    }
    this.onDelete = this.onDelete.bind(this);
    this.handlePage = this.handlePage.bind(this);
    this.chevron_left_click = this.chevron_left_click.bind(this);
    this.chevron_right_click = this.chevron_right_click.bind(this);
  }
  componentDidMount() {
    this.props.getRealters();
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
    if (nextProps.realters) {
      this.setState({
        realters: nextProps.realters.realters,
        loading: nextProps.realters.loading
      });
    }
  }
  onDelete(id) {
    this.props.deleteRealter(id);
    setTimeout(() => {
      this.props.getRealters();
    },1000)
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
    if (this.state.currentPage !== Math.ceil(this.state.realters.length / this.state.perPage)) {
      this.setState({ currentPage: Number.parseInt(this.state.currentPage) + 1 });
    }
  }

  render() {
    const {perPage, currentPage } = this.state;
    const { loading, realters } = this.state;
    let realterContent;
    if (realters === null || loading) {
      realterContent = <Spinner />;
    } else {
      if (realters.realters !== undefined) {
        realterContent = <p>No realter found</p>
      } else {
        //logic for display inquiry 
        let indexOfLastRealter = currentPage * perPage;
        let indexOfFirstRealter = indexOfLastRealter - perPage;
        let currentRealter = realters.slice(indexOfFirstRealter, indexOfLastRealter)
        let pageNumbers = [];
        let index = 0;
        for (let i = 1; i <= Math.ceil(realters.length / perPage); i++) {
          pageNumbers[index] = i;
          index++;
        }
        //if email taken already
        realterContent =
          (<div>
            <section className="container">
              <div>
                <div className="row">
                  <div className="col s12 m9">
                    <br></br>
                    <Link to="/admin/home" className="btn grey lighten-4 z-depth-0 grey-text text-darken-4">Back To Home</Link>
                    <br></br>
                    <br></br>
                    <br></br>
                    <p className="flow-text" style={{ margin: '0' }}>All the realters</p>
                    <div className="fixed-action-btn">
                    <Link to="/admin/addRealter" className="btn-floating red btn-large waves-effect">
                    <i className="material-icons">add</i>
                    </Link>
                    </div>
                    <br></br>
                    <table className="striped grey-text text-darken-1">
                      <thead>
                        <tr>
                          <th>S. No.</th>
                          <th>Avatar</th>
                          <th>NAME</th>
                          <th>HIRE DATE</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          currentRealter.map((realter, i) => 
                            <RealterItem i={indexOfFirstRealter + 1 + i} realter={realter} key={realter._id} onDelete={this.onDelete}/>
                          )
                        }
                      </tbody>
                    </table>
                    {/* pagination */}
                    <p>{realters.length} realters</p>
                    {
                      realters.length > 8 ?
                        (<ul className="pagination">
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
                        </ul>)
                        : null
                    }
                  </div>
                </div>
              </div>
            </section>
          </div>);
      }
    }

    return (
      <div>
        {realterContent}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  realters: state.realters
});
export default connect(mapStateToProps, { getRealters, deleteRealter })(Contact);