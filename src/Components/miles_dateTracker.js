import { Component } from "react";
import axios from "axios";
import MilesToOilChange from "./MilesToOilChange";
import Populateddata from "./Populateddata";

class miles_dateTracker extends Component {
  constructor() {
    super();
    this.state = {
      trips: [],
      miles: "",
      date: "",
      milesToOilChange: 0,
    };
  }

  componentDidMount() {
    this.readTrip();
    this.readMilesToOilChange();
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
  updateTrip = (id, miles, date) => {
    axios
      .put(`/api/trips/${id}`, { miles, date })
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
      .put(`/api/oil/${this.state.milesToOilChange}`)
      .then((res) => {
        this.setState({
          milesToOilChange: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  deleteTrip = (id) => {
    axios
      .delete(`/api/trips/${id}`)
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
  }
  handleMilesChange(e) {
    // this.createTrip()
    this.setState({
      miles: e.target.value,
    });
    // return this.state.milesToOilChange - this.state.trips.miles
  }
  handleDateChange(e) {
    // this.createTrip(this.state.trips.date)
    this.setState({
      date: e.target.value,
    });
  }

  render() {
    const mappedTrips = this.state.trips.map((trip) => {
      return (
        <Populateddata
          key={trip.id}
          trip={trip}
          createTrip={this.createTrip}
          updateTrip={this.updateTrip}
          deleteTrip={this.deleteTrip}
        />
      );
    });
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
        <MilesToOilChange
          updateMilesToOilChange={this.updateMilesToOilChange}
          updateOilChange={this.updateOilChange}
          milesToOilChange={this.state.milesToOilChange}
        />
      </div>
    );
  }
}

export default miles_dateTracker;
