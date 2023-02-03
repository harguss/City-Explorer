import React from "react";
import "./App.css";
import axios from "axios";
import { Card } from 'react-bootstrap';

let API_KEY = process.env.REACT_APP_LOCATION_KEY;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      cityData: {},
      mapData: '',
      displayMap: false,
      displayError: false,
      errorMessage: "",
      weatherData: []
    }
  }

  submitCityHandler = async (event) => {
    event.preventDefault();
    try {
      let url = `https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${this.state.city}&format=json`;

      let cityInfo = await axios.get(url);

      this.setState({
        cityData: cityInfo.data[0],
        displayMap: true,
        error: false,
      },
        () => {
          this.getMapData();
        }
      );
    } catch (error) {
      this.setState({
        displayMap: false,
        error: true,
        errorMessage: `an error occured: ${error.response.status}`,
      });
    }
  };


  handleCityInput = (event) => {
    this.setState({
      city: event.target.value,
    });
  };


  getMapData = async () => {
    let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&size=${window.innerWidth}x300&format=jpg&zoom=12`;

    let mapDataResponse = await axios.get(mapURL);
    this.setState({
      mapData: mapDataResponse.config.url,
    });
    this.displayWeather(this.state.cityData.lat, this.state.cityData.lon, this.state.city);
  };




  displayWeather = async (lat, lon, searchQuery) => {
    try {
      let weather = await axios.get(`${process.env.REACT_APP_API_URL}/weather`, { params: { latitude: lat, longitude: lon, searchQuery: searchQuery } });
      this.setState({
        weatherData: weather.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  ///////
  //   getMovieData = async (search) => {
  //   const results = await axios.get(`${API_KEY}/movieData`, {params: {
  //       search,
  //   }
  // })
  // console.log(results.data);
  //   }
  //////



  render() {

    Object.entries(this.state.cityData).map(([key, value], index) => {
      return <li key={index}>{value.display_name}</li>
    });

    let weatherData = this.state.weatherData.map((forecast, index) => {
      return <li key={index}> Forecast:{forecast.description} |  Date: {forecast.date}</li>
    });


    return (
      <>
        <h1>City Explorer</h1>
        <ul>
          <div>
            {this.state.cityData.display_name}
            {this.state.cityData.lat}
            {this.state.cityData.lon}
            {this.state.displayMap}
          </div>
        </ul>

        <form id="form" onSubmit={this.submitCityHandler}>
          <label>
            Pick a City:
            <input type="text" onInput={this.handleCityInput} />
          </label>
          <button type="submit">Explore!!</button>
        </form>

        {/* {

          this.state.mapData && <img src={this.state.mapData} alt={this.state.city} />
        } */}

        {/* {
          this.state.mapData && 
          <div className="d-flex align-items-center">
            <img src={this.state.mapData} alt={this.state.city} className="rounded-circle" />
          </div>
        } */}
         <div>
          <Card style={{ width: '20rem', borderRadius: '50%' }}>
            <Card.Img variant="top" src={this.state.mapData} alt={this.state.city} />
          </Card>
        </div> 

        <ul>{weatherData}</ul>

      </>

    );

  }
}


export default App;





