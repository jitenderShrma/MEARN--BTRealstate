import React, { Component } from 'react'
import { connect } from 'react-redux';
import M from 'materialize-css';
import classnames from 'classnames';
import { getListing, filterListing } from '../../actions/listingAction';
import { removeErrors } from '../../actions/authAction';
import ListItem from './ListingItem';
import Spinner from '../common/Spinner';
import TextInput from '../common/TextInput';
class Listing extends Component {
  constructor() {
    super();
    this.state = {
      listing: {},
      keyword: '',
      price: '',
      city: '',
      states: '',
      badrooms: '',
      perPage: 6,
      totalPage: null,
      currentPage: 1,
      userResponse: null
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.handlePage = this.handlePage.bind(this);
    this.chevron_left_click = this.chevron_left_click.bind(this);
    this.chevron_right_click = this.chevron_right_click.bind(this);
  }
  componentDidUpdate() {
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems, {});
  }
  componentWillMount() {
    this.props.removeErrors();
    this.props.getListing();
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems, {});
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.listing) {
      this.setState({ listing: nextProps.listing });
    }
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit = function (e) {
    const newSearch = {
      keyword: this.state.keyword,
      price: this.state.price,
      city: this.state.city,
      states: this.state.states,
      badrooms: this.state.badrooms,
    }
    if (newSearch.keyword != null || newSearch.price != null || newSearch.city != null || newSearch.states != null || newSearch.badrooms != null) {
      this.props.filterListing(newSearch);
    } else {
      alert('please select value first');
    }

    // prevent Default behave of form
    e.preventDefault();
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
    if (this.state.currentPage !== Math.ceil(this.state.listing.lists.length / this.state.perPage)) {
      this.setState({ currentPage: Number.parseInt(this.state.currentPage) + 1 });
    }
  }
  render() {
    let showcaseContent;
    let listsContent = null;
    let { loading, lists, heading } = this.state.listing;
    let { currentPage, perPage } = this.state;
    if (lists === undefined || loading === true) {
      listsContent = <Spinner />
    } else {
      if (lists.length === 0) {
        listsContent = (<h5 className="center">No Listing Found</h5>);
      } else {

        // logic for display listing
        let indexOfLastList = currentPage * perPage;
        let indexOfFirstList = indexOfLastList - perPage;
        let currentLists = lists.slice(indexOfFirstList, indexOfLastList);
        let pageNumbers = [];
        let index = 0;
        for (let i = 1; i <= Math.ceil(lists.length / perPage); i++) {
          pageNumbers[index] = i;
          index++;
        }
        listsContent = (
          <div>
            <div className="row">
              <h4 className="center">{heading}</h4>
              <div className="container">
              {currentLists.map(list => <ListItem list={list} key={list._id}/>)}
              </div>
            </div>
            {/* pagination */}
            {lists.length >= 6 ? (<div className="container">
              <p>{lists.length} Listing</p>
              <ul className="pagination">
                <li className={classnames('', { 'disabled': (currentPage === 1) })}>
                  <a href="#!" onClick={this.chevron_left_click}>
                    <i className="material-icons">chevron_left</i>
                  </a>
                </li>
                {
                  pageNumbers.map((page, index) =>
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
            </div>) : null}
          </div>
        );
      }
    }
    showcaseContent = (<div>
      <br></br>
      <div className="container">
        <section className="showcase-listing grey lighten-4 grey-text text-darken-4">
          <div className="showcase-listing-content center">
            <h4>Just go easy for searching home</h4>
            <p className="hide-on-small-only">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit molestias magni
            ratione assumenda? Delectus,
              necessitatibus.</p>
            <form>
              <div className="row">
                <div className="col s12 m4">
                  <div className="input-field">
                    <TextInput
                      type="text"
                      placeholder="Keyword(Garage, Pool, etc.)"
                      name="keyword"
                      value={this.state.keyword}
                      onChange={this.onChange}
                      labelText="Keyword"
                    />
                  </div>
                </div>
                <div className="col s12 m4">
                  <div className="input-field">
                    <TextInput
                      type="text"
                      placeholder="City"
                      name="city"
                      value={this.state.city}
                      onChange={this.onChange}
                      labelText="City"
                    />
                  </div>
                </div>
                <div className="col s12 m4">
                  <div className="input-field">
                    <select
                      name="states"
                      value={this.state.states}
                      onChange={this.onChange}
                      id="states"
                    >
                      <option value='' defaultValue>Select All(State)</option>
                      <option value="haryana">Haryana</option>
                      <option value="rajestan">Rajestan</option>
                      <option value="mp">MP</option>
                      <option value="up">UP</option>
                      <option value="bihar">Bihar</option>
                    </select>
                    <label htmlFor="states">States</label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col s12 m6">
                  <div className="input-field">
                    <select
                      name="badrooms"
                      value={this.state.badrooms}
                      onChange={this.onChange}
                      id="badroom"
                    >
                      <option value='0' defaultValue>Select All(Badroom)</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                    <label htmlFor="badroom">Badroom</label>
                  </div>
                </div>
                <div className="col s12 m6">
                  <div className="input-field">
                    <select
                      name="price"
                      value={this.state.price}
                      onChange={this.onChange}
                      id="price"
                    >
                      <option value='0' defaultValue>Select All(Max Price)</option>
                      <option value="100000">$100,000 and above</option>
                      <option value="200000">$200,000 and above</option>
                      <option value="400000">$400,000 and above</option>
                      <option value="800000">$800,000 and above</option>
                      <option value="1000000">$1000,000 and above</option>
                    </select>
                    <label htmlFor="badroom">Price</label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                  <a href="#!" className="btn waves-effect waves-light z-depth-0"
                    onClick={this.onSubmit.bind(this)}
                  >SUBMIT FORM</a>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>);
    return (
      <div>
        {showcaseContent}
        <section>
          {listsContent}
        </section>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  listing: state.listing
});
export default connect(mapStateToProps, { getListing, filterListing, removeErrors })(Listing);
