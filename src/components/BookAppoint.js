import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
// import  Card  from 'react-bootstrap/Card';
// import { Modal, Button } from 'react-bootstrap'

class BookAppoint extends React.Component {
    render(){
  
        
    
        return (
          <Modal show={this.props.displayModal} onHide={this.props.hideModal}>
          <Modal.Dialog>
            <Modal.Header>
              {/* <h2>{this.props.title}</h2> */}
            </Modal.Header>
            <Modal.Body>
            <form onSubmit={this.props.addAppoint}>
                <input placeholder='Enter your name' type="text" name='buyername' /><br/><br/>
                {/* <input placeholder='Email: abc@gmail.com' type="text" name='buyeremail' /><br/><br/> */}
                <input placeholder='1/1/2022' type="text" name='date' /><br/><br/>
                <input placeholder='1:00 PM' type="text" name='time' /><br/><br/>
                <input type="submit" value="Book Appointment" />
            </form>
            <Button onClick = {this.props.hideModal} variant="primary" size="lg" block>C L O S E</Button>
          </Modal.Body>
          </Modal.Dialog>
          </Modal>
        )
      }
}

export default BookAppoint;