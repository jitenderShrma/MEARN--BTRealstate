import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment';
import Image from "react-graceful-image";
class ListingItem extends Component {
  constructor() {
    super();
    this.props = {
      pic: ''
    }
  }
  render() {
    const { list } = this.props;
    const diffDays = moment(new Date()).diff(moment(list.date), 'days');
    const diffHours = moment(new Date()).diff(moment(list.date), 'hours');
    const ulStyle = {
      padding: '0'
      
    }
    return (
      <div className="list-item">
        <div className="col s12 l4 m6">
          <div className="card">
            <div className="card-image">
              <Image
                src={`/props/listing/${list.image0}`}
                width="250"
                height="200"
                alt="House Front"
              />
              <span className="card-title teal lighten-2 price" style={{ padding: '2px 3px' }}><i className="fas fa-dollar-sign"></i> {list.price}</span>
            </div>
            <div className="card-content" style={{ paddingTop: 0 }}>
              <ul className="collection with-header center" style={{ border: 'none',margin:'0' }}>
              <li className="collection-header center" style={ulStyle}>
                  <span className="title list-title">{list.title.toUpperCase()}</span><br></br>
                  <span className=""><i className="fas fa-map-marker-alt teal-text text-lighten-1"></i>{' '}{list.address.street.toUpperCase()} {' '} {list.address.city.toUpperCase()} {list.address.zipcode} </span>
                  <br></br>
                  <span className="center">{list.address.state.toUpperCase()}</span>
                  <br></br>
                </li>
                <li className="collection-item teal-text text-lighten-1" >
                  {/* <span><i className="fas fa-square-full"></i> &nbsp; {list.specification.sqft} </span> */}
                  <span className=""><i className="fas fa-car"></i> Garage {list.specification.garage}</span><br></br>
                </li>
                <li className="collection-item teal-text text-lighten-1">
                  <span><i className="fas fa-bed"></i> Badrooms {list.specification.badrooms}</span>
                  {/* <span className="right"><i className="fas fa-bath"></i> Bathrooms {list.specification.bathrooms}</span> */}
                </li>
                <li className="collection-item teal-text text-lighten-1">
                  <span><i className="fas fa-user"></i>{' '} {list.realter}</span><br></br><br></br>
                  <span><i className="fas fa-clock"></i>{' '} {diffDays > 0 ? (<span>{diffDays} day</span>) : (<span>{diffHours} hour</span>)} ago    </span>
                </li>
              </ul>
              {/* <div className="center">
                <div className="title">
                  {list.title.toUpperCase()}
                </div>
                <span className="center"><i className="fas fa-map-marker-alt teal-text text-lighten-1"></i>{' '}{list.address.street.toUpperCase()} {' '} {list.address.city.toUpperCase()} {list.address.zipcode} </span>
                <br>
                </br>
                <span className="collection-item teal-text text-lighten-1"><i className="fas fa-square-full"></i> &nbsp; {list.specification.sqft} </span>
                <span className="right"><i className="fas fa-car"></i> Garage {list.specification.garage}</span><br></br>
              </div> */}

              <Link href="#!" to={`/listing/${list.title}/${list.realter}`} className="btn btn-block">MORE INFO</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default ListingItem;