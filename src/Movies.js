import React from "react";
import axios from "axios"

class Movies extends React.Component {
  render() {
    return(
     this.props.movies.map((movie, index) => {
        return <img key={index} src={movie.imageUrl} alt={movie.title} />;
      })
  )
}
}

export default Movies;