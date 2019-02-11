import React, { Component } from 'react'
import { connect } from 'react-redux';
import ListingItem from './ListingItem';
import classnames from 'classnames';
import { Link, withRouter } from 'react-router-dom';
import { getListingFromAdmin, saveUnpublish } from '../../../actions/listingAction';
import Spinner from '../../common/Spinner';
class Listing extends Component {
  constructor() {
    super();
    this.state = {
      lists: [],
      loading: false,
      perPage: 8,
      totalPage: null,
      currentPage: 1,
      Arr: []
    }
    this.onClickHandle = this.onClickHandle.bind(this);
    this.handlePage = this.handlePage.bind(this);
    this.chevron_left_click = this.chevron_left_click.bind(this);
    this.chevron_right_click = this.chevron_right_click.bind(this);
  }
  handlePage(e) {
    this.setState({ currentPage: Number.parseInt(e.target.id) });
  }

  chevron_left_click() {
    if (this.state.currentPage !== 1) {
      this.setState({ currentPage: this.state.currentPage - 1 });
    }
  }

  chevron_right_click() {
    if (this.state.currentPage !== Math.ceil(this.state.lists.length / this.state.perPage)) {
      this.setState({ currentPage: Number.parseInt(this.state.currentPage) + 1 });
    }
  }
  componentWillMount() {
    this.props.getListingFromAdmin();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.listing) {
      this.setState({ lists: nextProps.listing.lists });
      this.setState({ loading: nextProps.listing.loading });
    }

  }
  onSave() {
    if(this.state.Arr.length === 0){
      alert('check first');
    } else {
      this.props.saveUnpublish(this.state.Arr);
      //this.setState({Arr: []});
    setTimeout(() => {
      this.props.getListingFromAdmin();
    },1000)
    }
    
  }
  
  onClickHandle(list, stat) {
    
    if(this.state.Arr.length === 0){
      let array_first = {
        _id: list._id,
        isPublish: stat
      }
      this.setState({Arr: this.state.Arr.concat([array_first]) });
    } else {
      this.state.Arr.forEach(item => {
        if(item._id === list._id){
          this.state.Arr.forEach((item, i) => {
            if(item._id == item._id){
              let array_first = this.state.Arr;
              array_first.splice(i, 1);
              let array_third = {
                _id: list._id,
                isPublish: stat
              }
              this.setState({Arr: this.state.Arr.concat([array_third])});
            } else {
              let array_forth = {
                _id: list._id,
                isPublish: stat
              }
              this.setState({Arr: this.state.Arr.concat([array_forth])});
            }
          });
      
        } else {
          let array_second = {
            _id: list._id,
            isPublish: stat
          }
          this.setState({Arr: this.state.Arr.concat([array_second])});
        }
      });
      setTimeout(() => console.log(this.state.Arr),2000)
    }
  }
  render() {
    const { lists, loading, perPage, currentPage } = this.state;
    let listingContent;
    if (lists.length === 0 || loading || lists === undefined) {
      listingContent = <Spinner />
    } else {

      //logic for display list 
      let indexOfLastList = currentPage * perPage;
      let indexOfFirstList = indexOfLastList - perPage;
      let currentList = lists.slice(indexOfFirstList, indexOfLastList);
      let pageNumbers = [];
      let index = 0;
      for (let i = 1; i <= Math.ceil(lists.length / perPage); i++) {
        pageNumbers[index] = i;
        index++;
      }

      listingContent = (<div>
        <section className="container">
          <div className="">
            <div className="row">
              <div className="col s12 m9">
                <br></br>
                <Link to="/admin/home" className="btn grey lighten-4 z-depth-0 grey-text text-darken-4">Back To Home</Link>
                <br></br>
                <br></br>
                <br></br>
                <p className="flow-text" style={{ margin: '0' }}>All the Listing</p>
                <table className="responsive-table striped grey-text text-darken-1" id="table">
                  <thead>
                    <tr>
                      <th>S. No.</th>
                      <th>TITLE</th>
                      <th>IS PUBLISH</th>
                      <th>PRICE</th>
                      <th>LIST DATE</th>
                      <th>REALTER</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      currentList.map((list, i) => (
                        <ListingItem key={list._id} list={list} i={1 + i} onClickHandle={this.onClickHandle} />
                      ))
                    }
                  </tbody>
                </table>
                {/* pagination */}
                <p>{lists.length} Listing</p>
                {lists.length > 8 ? (
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
                <a
                  className="btn right"
                  href="#!"
                  onClick={this.onSave.bind(this)}
                >SAVE CHANGES</a>
                {/* <p>{lists.length} Listing</p> */}
              </div>
              <div className="col s12 m3 center">
                <br></br>
                <br></br>
                {/* fixed action btn */}
                <div className="fixed-action-btn">
                  <div className="btn-floating red btn-large waves-effect">
                    <Link to="/admin/addList">
                      < i className="material-icons">add</i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>)
    }
    return (
      <div>
        {listingContent}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  listing: state.listing
});
export default connect(mapStateToProps, { getListingFromAdmin, saveUnpublish })(withRouter(Listing));