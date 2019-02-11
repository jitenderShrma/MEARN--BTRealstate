import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';
import { getLists } from '../../actions/listingAction';
import ListingItem from '../listing/ListingItem';
class Home extends Component {
  constructor(){
    super();
    this.state = {
      listing: []
    }
  }
  componentWillMount(){
    this.props.getLists();
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.listing){
      this.setState({listing: nextProps.listing});
    }
  }
  render() {
    const { lists, loading } = this.state.listing;
    let listContent;

    if(lists === undefined || loading === true){
      listContent = <Spinner/>
    } else {
      
      if(lists.length === 0){
        listContent = 'No listing found';
      } else {
        listContent = lists.map(list => <ListingItem list={list} key={list._id}/>);
      }
    }
    return (
      <div>
        <section className="showcase-home">
          <div className="home-showcase-overlay"></div>
          <div className="showcase-content">
            <div className="container">
              <h3>Searching home just go easy</h3>
              <p className="hide-on-small-only">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit molestias magni
                ratione assumenda? Delectus,
                necessitatibus.
                </p>
              <Link to="listing" className="btn waves-effect">EXPLORE MORE</Link>
            </div>
          </div>
        </section>
        <section className="section section-listing">
          <div className="container">
            <h3 className="center">Latest Listing</h3>
            <div className="row">
              {listContent}
            </div>
          </div>
        </section>
        <section className="section section-info">
          <div className="primary-overlay"></div>
          <div className="container">
            <div className="row">
              <div className="col s12 m4 center white-text">
                <i className="far fa-comment fa-3x"></i>
                <h5>Consuling Services</h5>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet, adipisci?</p>
              </div>
              <div className="col s12 m4 center white-text">
                <i className="fas fa-home fa-3x"></i>
                <h5>Proparty Management</h5>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, beatae!</p>
              </div>
              <div className="col s12 m4 center white-text">
                <i className="far fa-building fa-3x"></i>
                <h5>Ranting & Selling</h5>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, dignissimos!</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  listing: state.listing
});

export default connect(mapStateToProps, {getLists}) (Home);
