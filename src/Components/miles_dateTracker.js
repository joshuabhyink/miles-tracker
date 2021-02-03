import { Component } from "react";
import axios from "axios";
import MilesToOilChange from "./MilesToOilChange";
import Populateddata from "./Populateddata";

class miles_dateTracker extends Component {
  constructor() {
    super();
    this.state = {
      trips: [],
      miles: 0,
      date: "",
      milesToOilChange: null,
      milesToOilChangeInput: null,
    };
  }

  componentDidMount() {
    this.readTrip();
    this.readMilesToOilChange();
    this.setState({
      milesToOilChange: 6000,
    });
  }
  readTrip = () => {
    axios
      .get("/api/trips")
      .then((res) => {
        this.setState({
          trips: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  readMilesToOilChange = () => {
    axios
      .get("/api/oil")
      .then((res) => {
        this.setState({
          milesToOilChange: res.data,
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
        this.setState({
          trips: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  updateTrip = (id) => {
    const index = this.state.trips.findIndex(trip => trip.id === id)
    const trip = this.state.trips[index]
    axios
      .put(`/api/trips/${id}`, trip)
      .then((res) => {
        this.setState({
          trips: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  updateMilesToOilChange = () => {
    axios
      .put(`/api/oil/${this.state.milesToOilChangeInput}`)
      .then((res) => {
        this.setState({
          milesToOilChange: res.data,
          milesToOilChangeInput: "",
        });
      })
      .catch((err) => {
        console.log(err);
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
          trips: res.data,
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
    });
  };
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
      trip.miles = +value
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
    const reduce = this.state.trips.reduce((acc, cur) => {acc += cur.miles},0)
    console.log(reduce)
    const totalMiles = this.state.milesToOilChange - this.state.trips.reduce((acc, cur) => {acc += +cur.miles},0)
    return (
      <div>
        <input
          placeholder="Type miles here..."
          onChange={(e) => this.handleMilesChange(e)}
        />
        <input
          placeholder="Type date here..."
          onChange={(e) => this.handleDateChange(e)}
        />
        <button onClick={(e) => this.createTrip()}>Enter</button>

        {mappedTrips}
        <p>Miles To Next Oil Change: {totalMiles}</p>
        <MilesToOilChange
          updateMilesToOilChange={this.updateMilesToOilChange}
          updateOilChange={this.updateOilChange}
          milesToOilChange={this.state.milesToOilChange}
          handleMilesChange={this.handleMilesChange}
          milesToOilChangeInput={this.state.milesToOilChangeInput}
          handleMileInput={this.handleMileInput}
        />
      </div>
    );
  }
}

export default miles_dateTracker;
