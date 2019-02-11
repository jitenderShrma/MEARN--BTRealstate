import React, { Component } from 'react';
import './App.css';
import Navbar from './components/layouts/Navbar'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from './Store';
import PrivateRoute from './components/common/PrivateRoute';
import PageNotFound from './components/common/PageNotFound';
import AdminRoute from './components/common/AdminRoute';
import Footer from './components/layouts/Footer';
import Home from './components/layouts/Home';
import About from './components/layouts/About';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import Listing from './components/listing/Listing';
import List from './components/list/List';
// admin
import AdminLogin from './components/admin/Login';
import AdminHome from './components/admin/Home';
import AdminUsers from './components/admin/users/Users';
import Contact from './components/admin/contact/Contact';
import Realter from './components/admin/realters/Realter';
import AddRealter from './components/admin/realters/AddRealters';
import ListingFromAdmin from './components/admin/listing/Listing';
import AddList from './components/admin/listing/AddList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      hide: false
    }
  }
  render() {
    return (
      <Provider store={Store}>
        <Router>
          <div className="App">
            <Navbar/>
            
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/listing" component={Listing} />
              <Route exact path="/about" component={About} />
              <Route exact path="/listing/:title/:realter" component={List} />

              {/* Admin Routes */}
              <Route exact path="/admin" component={AdminLogin} />
              <AdminRoute exact path="/admin/usersList" component={AdminUsers} />
              <AdminRoute exact path="/admin/home" component={AdminHome} />
              <AdminRoute exact path="/admin/contactList" component={Contact} />
              <AdminRoute exact path="/admin/realterList" component={Realter} />
              <AdminRoute exact path="/admin/addRealter" component={AddRealter} />
              <AdminRoute exact path="/admin/listingList" component={ListingFromAdmin} />
              <AdminRoute exact path="/admin/addList" component={AddList} />

              {/* Private Routes */}
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <Route path="*" component={PageNotFound} />
            </Switch>
            {
              !this.state.hide && <Footer />
            }
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
