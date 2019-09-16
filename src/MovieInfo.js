import React from "react";

const MovieInfo = props => {
  const dateString = new Date(props.release_date).toString;
  return (
    <div className="movieInfo">
      <p>{props.title}</p>
      <p>{dateString}</p>
    </div>
  );
};

export default MovieInfo;
