import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap'
import DeleteModal from './DeleteModal'
import UpModal from './UpModal'
class MyAppointments extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      appointData: [],
      server: 'http://localhost:3003',
      email: '',
      username : '',
      id : 0,
      displayDeletModal : false,
      displayUpModal :0 
    }
  }
  componentDidMount = async () => {
    const { user } = this.props.auth0
    await this.setState({
      email: `${user.email}`,
      username :`${user.name}`
    })
    axios
      .get(`${this.state.server}/getAppiont?email=${this.state.email}`)
      .then(tempArr => {
        this.setState({
          appointData: tempArr.data
        })
        console.log(this.state.appointData);
      })
  }
  hideDeleteModal = () => { this.setState({ displayDeletModal: false }); }
  showDeleteModal = (idx) => {
    // key.preventDefault()
    this.setState({ 
      displayDeletModal: true,
      id : idx
    })

  }
  deleteAppoint = async (idx) => {
    let paramsObj = {
      email: this.state.email
    }
    axios
      .delete(`${this.state.server}/deleteappoint/${idx}`, { params: paramsObj })
      .then(tempArr => {
        this.setState({
          appointData: tempArr.data,
          displayDeletModal: false
        })
      })
  }

  hideUpdateModal = () => { this.setState({ displayUpModal: false }); }
  showUpModal = (idx) => {
    // key.preventDefault()
    this.setState({ 
      displayUpModal: true,
      id : idx
    })

  }

  updateAppoint = async (idx) => {
    let upObj = {
      email: this.state.email,
      buyername: this.state.appointData[idx].buyername,
      buyeremail:this.state.appointData[idx].buyeremail,
      date: this.state.appointData[idx].date,
      time : this.state.appointData[idx].time,
      aproval : true
    }
    axios
      .put(`${this.state.server}/updateAppoint/${idx}`, upObj)
      .then(tempArr => {
        this.setState({
          appointData: tempArr.data,
          displayUpModal: false
        })
      })
  }
  render() {
    return (
      <div>
        <h1>{this.state.username} Appointments</h1>
        {this.props.auth0.isAuthenticated && this.state.appointData.map((item, idx) => {
          return (
            <Card style={{ width: '18rem', display: 'inline-block' },{marginLeft: '5%'}}>
              <Card.Body>
                <Card.Title>{item.date}<p>   </p>{item.time}</Card.Title>
                <Card.Text>
                  {item.buyername}<br></br>
                  {item.buyeremail}
                </Card.Text>
                <Button variant="primary" onClick={() => this.showDeleteModal(idx)}>Ignore</Button>
                <Button variant="primary" onClick={() => this.showUpModal(idx)}>Accept</Button>
              </Card.Body>
            </Card>
          )
        })}
        <DeleteModal DeleteAppoint={() => this.deleteAppoint(this.state.id)} displayModal={this.state.displayDeletModal} hideModal={this.hideDeleteModal} />
        <UpModal UpAppoint={() => this.updateAppoint(this.state.id)} displayModal={this.state.displayUpModal} hideModal={this.hideUpdateModal} />
      </div>
    )
  }
}

export default withAuth0(MyAppointments);
