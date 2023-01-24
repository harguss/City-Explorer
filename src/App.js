import React from "react";

class App extends React.Component {
   //constructor functions
   constructor(props){
     //add state
    super(props);
    this.state={
      cities: [],
    }
   }
  //add helper functions
  handleSubmit =(event) => {
  event.preventDefault();
  console.log("event", event);
  }
 
  

  render() {
    return <>
    <h1>Data!!!!</h1>

    <form onSubmit={this.handleSubmit}>
    <button type="submit">Explore!!</button>
    </form>
    </>;
  }
}

export default App;
