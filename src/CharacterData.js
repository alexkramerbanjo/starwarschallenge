import React from "react";
import MovieInfo from "./MovieInfo";

const CharacterData = props => {
  console.log(props);
  return (
    <div>
      <h3>{props.charData.name}</h3>
      {props.filmData.map((movie, index) => (
        <MovieInfo film={movie} key={"movie" + index}></MovieInfo>
      ))}
    </div>
  );
};
export default CharacterData;
