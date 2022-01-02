import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap'
import SearchForm from './SearchForm';
import BookAppoint from './BookAppoint'
class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allSellers: [],
      server: 'http://localhost:3003',
      displayAddModal: false,
      index : 0 ,
      email : ''
    }
  }
  componentDidMount = async () => {
    axios
      .get(`${this.state.server}/allsellers`)
      .then(tempArr => {
        this.setState({
          allSellers: tempArr.data
        })
      })
  }
  searchItems = async (event) => {
    event.preventDefault();
    const searchString = event.target.item.value;
    if (searchString === '') {
      this.componentDidMount()
    }
    else {
      this.setState(
        {
          allSellers: this.state.allSellers.filter((item) => item.name === searchString)
        }
      )
    }

  };
  hideModal = () => { this.setState({ displayAddModal: false }); }
  showAddModel = (idx) => {
    // key.preventDefault()
    this.setState({ 
      displayAddModal: true,
      index : idx
    })

  }


  bookAppoint = async (event) => {
    event.preventDefault();
    let addToSellerObj = {
      email: this.state.allSellers[this.state.index].email,
      buyername: event.target.buyername.value,
      buyeremail: this.props.auth0.user.email,
      date: event.target.date.value,
      time : event.target.time.value,
      aproval : false
      

    }
    let addToBuyerObj = {
      email: this.props.auth0.user.email,
      buyername: this.state.allSellers[this.state.index].name,
      buyeremail: this.state.allSellers[this.state.index].email,
      date: event.target.date.value,
      time : event.target.time.value,
      aproval : false
    }
    console.log(addToSellerObj);
    await axios.post(`${this.state.server}/addappoint`, addToSellerObj)
    console.log(addToBuyerObj);
    await axios.post(`${this.state.server}/addappoint`, addToBuyerObj)

    this.hideModal()
  }
  render() {
    return (
      <div>
        <h1>Hello {this.props.auth0.user.name}</h1>
        <SearchForm string="search for seller" searchItems={this.searchItems} />
        <h1>Our Sellers</h1>
        {this.state.allSellers.map((seller, idx) => {
          return (
            <Card style={{ width: '18rem' , display : 'inline-block'},{ marginLeft : '5%'}}>
              {/* <Card.Img variant="top" src={fllower.photo} /> */}
              <Card.Body>
                <Card.Title>{seller.name}</Card.Title>
                <Card.Text>
                  {seller.email}
                </Card.Text>
                <Button variant="primary" onClick={() => this.showAddModel(idx)}>Book An Appointment</Button>
              </Card.Body>
            </Card>
          )
        }
        )}
        <BookAppoint addAppoint={this.bookAppoint} displayModal={this.state.displayAddModal} hideModal={this.hideModal} />
      </div>
    )
  }
}

export default withAuth0(Home);
