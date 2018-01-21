import React, { Component } from "react";
import "./App.css";
import getWeather from "./Weather";

class App extends Component {
  constructor() {
    super();
    this.state = {
      weather: {},
      address: ""
    };

    this.onAddressSubmit = this.onAddressSubmit.bind(this);
    this.setAddressOnChange = this.setAddressOnChange.bind(this);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Geeky Weather</h1>
        </header>
        <form onSubmit={event => this.onAddressSubmit(event)}>
          <input
            className="Address-bar"
            name="address"
            type="text"
            id="address"
            value={this.state.address}
            placeholder="Enter address"
            onChange={event => this.setAddressOnChange(event.target.value)}
          />
          <input className="Submit-button" type="submit" value="Get Weather" />
        </form>
      </div>
    );
  }

  setAddressOnChange(address) {
    this.setState({ address });
  }

  onAddressSubmit(event) {
    const { weather, address } = this.state;
    console.log("Submitted", address);
    getWeather(address)
      .then(weather => {
        this.state.weather = weather;
        console.log("Working!!", weather);
      })
      .catch(error => {
        // render error component
      });
    event.preventDefault();
    return false;
  }
}

export default App;
