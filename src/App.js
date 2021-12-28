import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home'
import Login from './components/Login'
import FavFlowers from './components/MyAppointments'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { withAuth0 } from '@auth0/auth0-react';
import MyAppointments from './components/MyAppointments';


class App extends React.Component {

  render() {
    console.log('app', this.props);
    const { isAuthenticated } = this.props.auth0;
    return(
      <>
        <Router>
            <Header />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/SellerAppoint">
                {/* TODO: if the user is logged in, render the `FavFlowers` component, if they are not, render the `Login` component */}
                {this.props.auth0.isAuthenticated ? <MyAppointments /> : <Login />}
              </Route>
            </Switch>
            <Footer />
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
