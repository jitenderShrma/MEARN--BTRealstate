import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRealters } from '../../actions/realterAction';
import Spinner from '../common/Spinner';
class About extends Component {
  constructor() {
    super();
    this.state = {
      realters: []
    }
  }r
  componentWillMount() {
    this.props.getRealters();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.realters) {
      this.setState({ realters: nextProps.realters });
    }
  }
  render() {
    const { realters, loading } = this.state.realters;
    let realterContent;
    if (realters === undefined || loading === true) {
      realterContent = <Spinner />
    } else {
      let thumb;
      let sellerOfMonth;
      realters.forEach(realter => {
        if (realter) {
          sellerOfMonth = {
            data: realter.image.data.data,
            contentType: realter.image.contentType,
            name: realter.name
          }
          thumb = new Buffer(sellerOfMonth.data).toString('base64');
        }
      });
      const realter1 = {
        contentType: realters[0].image.contentType,
        data: realters[0].image.data.data
      }
      const realter2 = {
        contentType: realters[1].image.contentType,
        data: realters[1].image.data.data
      }
      const realter3 = {
        contentType: realters[2].image.contentType,
        data: realters[2].image.data.data
      }
      let relterPic1 = new Buffer(realter1.data).toString('base64');
      let relterPic2 = new Buffer(realter2.data).toString('base64');
      let relterPic3 = new Buffer(realter3.data).toString('base64');

      realterContent = (
        <div>
          {/* showcase */}
          <section className="showcase-about">
            <div className="bg-img-about"></div>
            <div className="about-content white-text center">
              <h3>About BT State</h3>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, doloremque!</p>
            </div>
          </section>
          {/* breadcrumb */}
          <div className="container">
            <nav className="grey lighten-2 z-depth-0">
              <div className="container">
                <div className="nav-wrapper">
                  <a href="home.html" className="breadcrumb  grey-text text-darken-1"><i className="material-icons">home</i> Home</a>
                  <a href="about.html" className="breadcrumb grey-text text-darken-3">About</a>
                </div>
              </div>
            </nav>
          </div>
          <br></br>
          {/* about section */}
          <section className="section section-about">
            <div className="container">
              <div className="row">
                <div className="col s12 m8">
                  <h4>We Search For The Perfect Home</h4>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, necessitatibus?</p>
                  <img
                  src={require('../../img/about.jpeg')} className="responsive-img about-img"
                  alt='Home'
                  />
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, impedit, deleniti adipisci temporibus
                    minima dolorem a et maiores distinctio quasi, tempore consequatur. Magni dolore dignissimos sint totam
                  eligendi, officia corrupti!</p>
                </div>
                <div className="col s12 m4">
                  <div className="card z-depth-0">
                    <div className="card-image">
                      <img
                      src={`data:${sellerOfMonth.contentType};base64,${thumb}`}
                      style={{ width: '100%', height: 'auto' }}
                      alt="seller of month"
                      />
                    </div>
                    <div className="card-content">
                      <h4 className="card-title">Seller of the month</h4>
                      <p className="teal-text">{sellerOfMonth.name}</p>
                      <br></br>
                      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos fugit tempore facilis nostrum non saepe
                      veritatis? Optio reprehenderit modi voluptatum maiores iure mollitia delectus. Sint, est odio nam
                      distinctio blanditiis quo soluta et eius nemo ipsa minus aspernatur iure. Maiores.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* work for section */}
          <section className="section section-work-for center">
            <h3>We Work For You</h3>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor, quasi.</p>
            <br></br>
            <Link to="/listing" className="btn teal darken-3 waves-effect waves-light">View Our Featured Listing</Link>
          </section>
          {/* team section */}
          <section className="section-team">
            <div className="container">
              <h4 className="center">Our Team</h4>
              <div className="row">
                <div className="col s12 m6 l4 center">
                  <img
                  src={`data:${realter1.contentType};base64,${relterPic1}`}
                  className="responsive-img circle"
                  alt="team1"
                  />
                  <h5>{realters[0].name}</h5>
                  <p className="teal-text">Realter</p>
                  <div className="divider"></div>
                  <p><i className="fas fa-phone"></i> {realters[0].phone}</p>
                  <p><i className="far fa-envelope"></i>&nbsp; {realters[0].email}</p>
                </div>
                <div className="col s12 m6 l4 center">
                  <img
                  src={`data:${realter2.contentType};base64,${relterPic2}`}
                  className="responsive-img circle"
                  alt="team2"
                  />
                  <h5>{realters[1].name}</h5>
                  <p className="teal-text">Realter</p>
                  <div className="divider"></div>
                  <p><i className="fas fa-phone"></i> {realters[1].phone}</p>
                  <p><i className="far fa-envelope"></i>&nbsp; {realters[1].email}</p>
                </div>
                <div className="col s12 m6 l4 center">
                  <img
                  src={`data:${realter3.contentType};base64,${relterPic3}`}
                  className="responsive-img circle"
                  alt="team3"
                  />
                  <h5>{realters[2].name}</h5>
                  <p className="teal-text">Realter</p>
                  <div className="divider"></div>
                  <p><i className="fas fa-phone"></i> {realters[2].phone}</p>
                  <p><i className="far fa-envelope"></i>&nbsp; {realters[2].email}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      )
    }
    return (
      <div>
        {realterContent}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  realters: state.realters
});
export default connect(mapStateToProps, { getRealters })(About);