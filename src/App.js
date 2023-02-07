import React from "react";
import "./App.css";
import axios from "axios";
// import { Card } from 'react-bootstrap';
// import Image from 'react-bootstrap/Image
import { Container, Button, Form } from "react-bootstrap";



let API_KEY = process.env.REACT_APP_LOCATION_KEY;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      cityData: {},
      mapData: '',
      weatherData: [],
      displayMap: false,
      displayError: false,
      errorMessage: "",

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
    let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&size=${window.innerWidth}x600&format=jpg&zoom=12`;

    let mapDataResponse = await axios.get(mapURL);
    this.setState({
      mapData: mapDataResponse.config.url,
    });
    this.displayWeather(this.state.cityData.lat, this.state.cityData.lon, this.state.city);
  };




  displayWeather = async (lat, lon, searchQuery) => {
    console.log(lat, lon, searchQuery);
    try {
      let weather = await axios.get(`${process.env.REACT_APP_API_URL}/weather`,
        {
          params: {
            latitude: lat,
            longitude: lon,
            searchQuery: searchQuery
          }
        });
      console.log('did we get back from the server?', weather);
      this.setState({
        weatherData: [weather.data],
      });
    } catch (error) {
      console.log(error);
    }
  };
  ///////
  //   getMovieData = async (search) => {
  //   const results = await axios.get(`${https://api.themoviedb.org/3/search/movie/?api_key=<{MOVIE_API_KEY}>&language=en-US&page=1&query=seattle}/movieData`, {params: {
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
      <Container id="body">

        <h1>City Explorer</h1>
        <ul>
          <div>
            {this.state.cityData.display_name}
            {this.state.cityData.lat}
            {this.state.cityData.lon}
            {this.state.displayMap}
          </div>

        </ul>

        <Form id="form" onSubmit={this.submitCityHandler}>
          <Form.Label>
            Pick a City:
            <Form.Control type="text" className="textbox" onInput={this.handleCityInput} />
            <Button type="submit">Explore!!</Button>
          </Form.Label>
          
        </Form>

        {/* {

          this.state.mapData && <img src={this.state.mapData} alt={this.state.city} />
        } */}


        {
          this.state.mapData && (
            <div className="map-container">
              <img src={this.state.mapData} alt={this.state.city} />
            </div>
          )
        }

        {
          this.state.weatherData.length > 0 && (
            <div className="weather-section">
              <h2>Weather Information for {this.state.city}</h2>
              <ul>
                {weatherData}
              </ul>
              <ul>
                {weatherData.date}
              </ul>
            </div>
          )
        }


      </Container>
    );

  }
}


export default App;





