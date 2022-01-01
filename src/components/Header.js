import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import { withAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

class Header extends React.Component {
  render() {
    const { isAuthenticated } = this.props.auth0;

    return(
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>Booking Appointment</Navbar.Brand>
        <Link style ={{marginInline : '2%'}} to="/">Our-Sellers</Link>
        <Link style ={{marginInline : '2%'}}to="/SellerAppoint"> your-Appointments</Link>
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </Navbar>
    );
  }
}

export default withAuth0(Header);
