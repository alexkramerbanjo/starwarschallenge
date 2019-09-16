import React, { useState } from "react";
import "./App.css";
import characters from "./characters.json";
import CharacterData from "./CharacterData.js";

function App() {
  const [character, selectCharacter] = useState(characters.characters[0].url);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [charData, setCharData] = useState({});
  const [filmData, setFilmData] = useState([]);
  const [error, setError] = useState(null);

  function onCharSelect(event) {
    const url = event.target.value;
    selectCharacter(url);
  }
  async function handleClick(e) {
    e.preventDefault();
    setDataLoaded(false);
    setFilmData([]);
    setCharData({});
    try {
      await getData(character);
    } catch (err) {
      setError(err);
    }
  }
  async function getData(url) {
    try {
      let res = await window.fetch(url);
      let data = await res.json();
      let films = await getMovies(data.films);

      setCharData(data);
      if (films === undefined) {
        console.log(films);
      } else {
        setFilmData(films);
      }
      setDataLoaded(true);
    } catch (err) {
      throw err;
    }
  }
  async function getMovies(urls) {
    return await Promise.all(
      urls.map(async url => {
        let res = await window.fetch(url);
        let movie = await res.json();
        return movie;
      })
    );
  }
  return (
    <div className="App">
      <header className="App-header"></header>
      <h1>Star Wars App</h1>
      <select onChange={onCharSelect}>
        {characters.characters.map((person, index) => (
          <option key={index} value={person.url}>
            {person.name}
          </option>
        ))}
      </select>
      <button onClick={handleClick}>Go!</button>
      <hr></hr>

      {error ? (
        <div className="error">{`an Error occured: ${error}`}</div>
      ) : null}
      {!error && dataLoaded ? (
        <CharacterData charData={charData} filmData={filmData}></CharacterData>
      ) : null}
    </div>
  );
}

export default App;
