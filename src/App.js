import React from "react";
import "./App.css";
import axios from "axios";
// import Map from './Map.js';
let API_KEY = process.env.REACT_APP_LOCATION_KEY;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      cityData: {},
      // mapData: '',
      displayMap: false,
      error: false,
      errorMessage: "",
    }
  }

  submitCityHandler = async (event) => {
    event.preventDefault();
    try {
      let url = `https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${this.state.city}&format=json`;
      console.log('URL:', url);

      let cityInfo = await axios.get(url);
      this.setState({
        cityData: cityInfo.data[0],
        // displayMap: true,
        error: false,
      },
      () =>{
        this.getMapData();
      }
      );
    } catch (error) {
      this.setState({
        // displayMap: false,
        error: true,
        errorMessage: `an error occured: ${error.response.status}`,
      });
      // console.log('Error:', error);
    }
  }
  // getMapData = async () => {
  //   let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_KEY}&center=${this.state.lat},${this.state.lon}&size=${window.innerWidth}x300&format=jpg&zoom=12`;
  //   let mapDataResponse = await axios.get(mapURL);
  //   this.setState({
  //     mapData: mapDataResponse.config.url,
  //   });
  // };


  handleCityInput = (event) => {
    this.setState({
      city: event.target.value,
    });
  };

  render() {

    Object.entries(this.state.cityData).map(([key, value], index) => {
      return <li key={index}>{value.display_name}</li>

    });
    // console.log('display map', this.state.displayMap),
    // console.log('City Data:', this.state.cityData);
    // console.log('Error:', this.state.error);
    // console.log('Error Message:', this.state.errorMessage);


    return (
      <>
        <h1>City Explorer</h1>
        <ul>
          <div>
            {this.state.cityData.display_name}
            {this.state.cityData.lat}
            {this.state.cityData.lon}
            {/* {this.state.displayMap} */}
          </div>
        </ul>

        <form id="form" onSubmit={this.submitCityHandler}>
          <label>

            {""}
            Pick a City:
            <input type="text" onInput={this.handleCityInput} />
          </label>
          <button type="submit">Explore!!</button>
        </form>

      </>
    )

  }
}

export default App;
