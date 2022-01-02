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
      displayUpModal :false ,
      sellerflag : false,
      date :'',
      time : '',
      buyeremail : '',
      tempAppointData : [],
      buyerIdx : 0
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
          appointData: tempArr.data.appointments
        })
        console.log(this.state.appointData);
        if(tempArr.data.role === 'seller')
        {
          this.setState({
            sellerflag : true
          })
        
        }
      })
  }
  hideDeleteModal = () => { this.setState({ displayDeletModal: false }); }
  showDeleteModal = (idx) => {
    // key.preventDefault()
    this.setState({ 
      displayDeletModal: true,
      id : idx,
      date : this.state.appointData[idx].date,
      time : this.state.appointData[idx].time,
      buyeremail : this.state.appointData[idx].buyeremail,
    })
    axios
    .get(`${this.state.server}/getAppiont?email=${this.state.appointData[idx].buyeremail}`)
    .then(tempArr1 => {
      this.setState({
        tempAppointData: tempArr1.data.appointments.find((item,i)=>{
      if(item.date === this.state.date && item.time === this.state.time)
      {
        console.log('index',i);
     this.setState({
       buyerIdx : i
     })
         return item
      }
    })
      })
      console.log('index',this.state.buyerIdx);
      console.log(this.state.tempAppointData);
    })
  }
  deleteAppoint = async (idx , buyerIdx) => {
   
    // this.state.deletAppointData
    let paramsbuyerObj = {
      email: this.state.buyeremail
    }
    axios
      .delete(`${this.state.server}/deleteappoint/${buyerIdx}`, { params: paramsbuyerObj })
      .then(tempArr2 => {
        console.log('prpb',buyerIdx);
        console.log('prob',tempArr2.data);
        this.setState({
          tempAppointData: tempArr2.data,
        })
      })
    let paramsObj = {
      email: this.state.email
    }
    axios
      .delete(`${this.state.server}/deleteappoint/${idx}`, { params: paramsObj })
      .then(tempArr => {
        console.log('prooob',tempArr.data)
        this.setState({
          
          appointData: tempArr.data
        })
      })
      console.log('buyer',this.state.buyeremail);
     
        this.hideDeleteModal();
  }

  hideUpdateModal = () => { this.setState({ displayUpModal: false }); }
  showUpModal = (idx) => {
    // key.preventDefault()
    this.setState({ 
      displayUpModal: true,
      id : idx,
      date : this.state.appointData[idx].date,
      time : this.state.appointData[idx].time,
      buyeremail : this.state.appointData[idx].buyeremail,
    })
    axios
    .get(`${this.state.server}/getAppiont?email=${this.state.appointData[idx].buyeremail}`)
    .then(tempArr1 => {
      this.setState({
        tempAppointData: tempArr1.data.appointments.find((item,i)=>{
      if(item.date === this.state.date && item.time === this.state.time)
      {
        console.log('index',i);
     this.setState({
       buyerIdx : i
     })
         return item
      }
    })
      })
      console.log('index',this.state.buyerIdx);
      console.log(this.state.tempAppointData);
    })

  }

  updateAppoint = async (idx , buyerIdx) => {
    let upSellerObj = {
      email: this.state.email,
      buyername: this.state.appointData[idx].buyername,
      buyeremail:this.state.appointData[idx].buyeremail,
      date: this.state.appointData[idx].date,
      time : this.state.appointData[idx].time,
      aproval : true
    }
    axios
      .put(`${this.state.server}/updateAppoint/${idx}`, upSellerObj)
      .then(tempArr => {
        this.setState({
          appointData: tempArr.data
        })
      })

      let upBuyerObj = {
        email: this.state.buyeremail,
        buyername: this.state.appointData[idx].buyername,
        buyeremail:this.state.email,
        date: this.state.date,
        time : this.state.time,
        aproval : true
      }
      axios
        .put(`${this.state.server}/updateAppoint/${buyerIdx}`, upBuyerObj)
        .then(tempArr => {
          this.setState({
            tempAppointData: tempArr.data
          })
        })
        this.hideUpdateModal()
  }
  render() {
    return (
      <div>
        <h1>{this.state.username} Appointments</h1>
        {this.state.sellerflag && <h4>You Are Seller</h4>}
        {!this.state.sellerflag && <h4>You Are Buyer</h4>}
        {this.props.auth0.isAuthenticated && this.state.appointData.map((item, idx) => {
          return (
            <Card style={{ width: '18rem', display: 'inline-block' },{marginLeft: '5%'}}>
              <Card.Body>
                <Card.Title>{item.date}<p>   </p>{item.time}</Card.Title>
                <Card.Text>
                  {item.buyername}<br></br>
                  {item.buyeremail}<br></br>
                  {item.aproval && 'Accepted'}
                </Card.Text>
                {this.state.sellerflag && <Button variant="primary" onClick={() => this.showDeleteModal(idx)}>Ignore</Button>}
                {this.state.sellerflag &&<Button variant="primary" onClick={() => this.showUpModal(idx)}>Accept</Button>}
              </Card.Body>
            </Card>
          )
        })}
        <DeleteModal DeleteAppoint={() => this.deleteAppoint(this.state.id , this.state.buyerIdx)} displayModal={this.state.displayDeletModal} hideModal={this.hideDeleteModal} />
        <UpModal UpAppoint={() => this.updateAppoint(this.state.id, this.state.buyerIdx)} displayModal={this.state.displayUpModal} hideModal={this.hideUpdateModal} />
      </div>
    )
  }
}

export default withAuth0(MyAppointments);
