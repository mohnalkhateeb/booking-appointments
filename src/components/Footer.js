import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';

class Footer extends React.Component {
  render() {
    return(
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{paddingInline : '33%'}}>
        <Navbar.Brand >&copy; Booking Appointments/Mohammad Alkhateeb</Navbar.Brand>
      </Navbar>
    );
  }
}

export default Footer;
