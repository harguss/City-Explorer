import React from 'react';
import "./App.css";
// import axios from 'axios';
// let API_KEY = process.env.REACT_APP_LOCATION_KEY;

// console.log('api', API_KEY);

class App extends React.Component {
  //constructor functions
  constructor(props) {
    //add state
    super(props);
    this.state = {
      city: "",
      //   cityData: {},
      //   error: false,
      //   errorMessage: "",
    }
  }

  //add helper functions
  submitCityHandler = async (event) => {
    event.preventDefault();

    console.log("event", event);
    // try {
    //   let url = `https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${this.state.city}&format=json`;
    //   let cityInfo = await axios.get(url);
    //   console.log("cityInfo", cityInfo.data[0]);


  }

  //   this.setState({
  //     cityData: cityInfo.data[0],
  //     error: false,
  //   });
  // } catch (error) {
  //   this.setState({
  //     error: true,
  //     errorMessage: `an error occured: ${error.response.status}`,
  //   });
  // }

  // console.log("error!!!!", this.state.error);
  // console.log("error.message!!!!", this.state.errorMessage);

  // handleCityInput = (event) => {
  //   this.setState({
  //     city: event.target.value,
  //   });
  // };


  render() {
    // console.log('!!!!!!!', this.state.city);
    // let cityData = this.state.city.map((cityName, index) => {
    //   return <li key={index}>{cityName.name}</li>;
    // });
    // console.log("city", this.state.cityData);

    return (
    <>
      
        {/* <ul>{cityData}</ul> */} 

      <form id="form" onSubmit={this.submitCityHandler}>
        <lable>
        <h1>City Explorer</h1>
          {""}
          Pick a City:
          {/* <input type="text" onInput={this.handleCityInput} /> */}
        </lable>
        <button type="submit">Explore!!</button>
      </form>
    </>
)

  }
}
export default App;
