import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
// import  Card  from 'react-bootstrap/Card';
// import { Modal, Button } from 'react-bootstrap'

class DeleteModal extends React.Component {
    render(){
  
        
    
        return (
          <Modal show={this.props.displayModal} onHide={this.props.hideModal}>
          <Modal.Dialog>
            <Modal.Header>
              <h2>Are You Sure To Ignore Appointment??</h2>
            </Modal.Header>
            <Modal.Body>
            <Button onClick = {this.props.DeleteAppoint} variant="primary" size="lg" block>Ignore</Button>
            <Button onClick = {this.props.hideModal} variant="primary" size="lg" block>C L O S E</Button>
          </Modal.Body>
          </Modal.Dialog>
          </Modal>
        )
      }
}

export default DeleteModal;