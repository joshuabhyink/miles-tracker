import { Component } from "react";
import axios from "axios";
import MilesToOilChange from "./MilesToOilChange";
import Populateddata from "./Populateddata";

class miles_dateTracker extends Component {
  constructor() {
    super()
    this.state = {
      trips: [],
      miles: '',
      date: "",
      milesToOilChange: 0,
      milesToOilChangeInput: '',
      totalMiles: 6000
    }
  }
  
  componentDidMount() {
    this.readTrip();
    this.readMilesToOilChange()
    this.setState({
      milesToOilChange: 6000,
    })
  }
  readTrip = () => {
    axios
    .get("/api/trips")
    .then((res) => {
      this.setState({
        trips: res.data,
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }
  readMilesToOilChange = () => {
    axios
    .get("/api/oil")
    .then((res) => {
      this.setState({
        milesToOilChange: res.data.milesToOilChange,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  };
  createTrip = () => {
    const { miles, date } = this.state;
    const trip = { miles, date };
    axios
    .post("/api/trips", trip)
    .then((res) => {
      const totalMiles = this.state.milesToOilChange - res.data.reduce((acc, cur) => {
        return acc + +cur.miles}, 0)
        if(totalMiles <= 0){
          alert ('Change your oil NOW!')
        }
      this.setState({
        trips: res.data,
        miles: '',
        totalMiles
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }
  updateTrip = (id) => {
    const index = this.state.trips.findIndex(trip => trip.id === id)
    const trip = this.state.trips[index]
    axios
    .put(`/api/trips/${id}`, trip)
    .then((res) => {
      this.setState({
        trips: res.data.trips,
        totalMiles: this.state.totalMiles - trip.miles + +res.data.originalMiles
      });
    })
    .catch((err) => {
      console.log(err);
    });
  };
  updateMilesToOilChange = () => {
      const totalMiles = +this.state.milesToOilChangeInput - this.state.trips.reduce((acc, cur) => {
        return acc + +cur.miles},0)
      this.setState({
        milesToOilChange: +this.state.milesToOilChangeInput,
        milesToOilChangeInput: "",
        totalMiles
      });
  };
  deleteTrip = (id) => {
    const { miles, date } = this.state;
    const trip = { miles, date };
    this.state.trips.findIndex((id) => {
      this.state.trips.splice(id, 1);
    });
    axios
    .delete(`/api/trips/${id}`, trip)
    .then((res) => {
      this.setState({
        trips: res.data.trips,
        totalMiles: this.state.totalMiles + +res.data.tripMiles
      });
    })
    .catch((err) => {
      console.log(err);
    });
  };
  updateOilChange = (value) => {
    this.setState({
      milesToOilChange: value,
    });
  };
  handleMileInput = (e) => {
    this.setState({
      milesToOilChangeInput: e.target.value,
    })
  }
  handleMilesChange = (e) => {
    this.setState({
      miles: e.target.value,
    });
  };
  handleDateChange(e) {
    this.setState({
      date: e.target.value,
    });
  }
  updateTripMiles = (id, value) => {
    const index = this.state.trips.findIndex(trip => trip.id === id)
    let copyArray = this.state.trips.slice()
    let trip = copyArray[index]
    trip.miles = value
    copyArray.splice(index, 1, trip)
    this.setState({
      trips: copyArray
    })
    
  }
  updateTripDate = (id, value) => {
    const index = this.state.trips.findIndex(trip => trip.id === id)
    let copyArray = this.state.trips.slice()
    let trip = copyArray[index]
    trip.date = value
    copyArray.splice(index, 1, trip)
    this.setState({
      trips: copyArray
    })
  }
  
  render() {
    const mappedTrips = this.state.trips.map((trip) => {
      console.log(trip);
      return (
        <Populateddata
        key={trip.id}
        trip={trip}
        createTrip={this.createTrip}
        updateTrip={this.updateTrip}
        deleteTrip={this.deleteTrip}
        updateTripMiles={this.updateTripMiles}
        updateTripDate={this.updateTripDate}
        />
      );
    });
    console.log(this.state)
    
      return (
      <div className='data'>
        <input
          placeholder="Type miles here..."
          onChange={(e) => this.handleMilesChange(e)}
          value={this.state.miles}
          className='inputMiles'
        />
          <div>
            <button className='enter' onClick={(e) => this.createTrip()}>Enter</button>
          </div>
        <input
          placeholder="Type date here..."
          onChange={(e) => this.handleDateChange(e)}
          className='inputDate'
        />
        {mappedTrips}
        <MilesToOilChange
          updateMilesToOilChange={this.updateMilesToOilChange}
          updateOilChange={this.updateOilChange}
          milesToOilChange={this.state.milesToOilChange}
          handleMilesChange={this.handleMilesChange}
          milesToOilChangeInput={this.state.milesToOilChangeInput}
          handleMileInput={this.handleMileInput}
          totalMiles={this.state.totalMiles}
        />
      </div>
    );
  }
}

export default miles_dateTracker;
