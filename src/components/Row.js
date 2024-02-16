import React, { useContext, useEffect, useState } from "react";
import axios from "../axios";
import "./stylesheets/Row.css";
import Movie from "./Movie";
import Modal from "./Modal";
import Wrapper from "./Wrapper";
import SearchContext from "../store/search-context";
const baseURL = "https://image.tmdb.org/t/p/original/";

// ToDo
// 1. Have posters for all and on hover show Title with Backdrop poster
function Row({ title, fetchURL, isLargeRow }) {
  const searchCtx = useContext(SearchContext);
  const [movie, setMovie] = useState();
  const [movies, setMovies] = useState([]);
  var filteredMovies = [];
  useEffect(() => {
    // make a request to TMDB to load information
    async function fetchData() {
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);
      return request;
    }

    fetchData();
  }, [fetchURL]); // we have to include fetchURL in dependencies because fetchURL variable is needed for async function to run.

  // useEffect(() => {
  //   if (
  //     searchCtx.searchTerm !== "" &&
  //     searchCtx.searchTerm !== undefined &&
  //     searchCtx.searchTerm !== null &&
  //     movies !== undefined
  //   ) {
  //     if (filteredMovies.length === 0) {
  //       filteredMovies = movies.filter((movie) =>
  //         movie?.title?.toLowerCase().includes(searchCtx.searchTerm.toLowerCase())
  //       );
  //       setMovies(filteredMovies);
  //     }
  //   } else {
  //     filteredMovies = [];
  //     setMovies(movies);
  //   }
  //   console.log(searchCtx.searchTerm);
  // }, [searchCtx.searchTerm, movies]);
  const handleClick = (id) => {
    if (movie) {
      setMovie();
    } else {
      setMovie(id);
    }
  };
  const clickHandler = () => {
    setMovie();
  };
  // destructuring props right here
  return (
    <Wrapper key={title}>
      {movie !== undefined && <Modal id={movie} onConfirm={clickHandler} />}
      <div className="row">
        {/* Title */}
        <h2>{title}</h2>
        <div className="row__posters">
          {/* Containers with Posters */}

          {movies &&
            movies.map((movie) => {
              return movie.backdrop_path !== null &&
                movie.poster_path !== null ? (
                <Movie
                  handleClick={handleClick}
                  isLargeRow={isLargeRow}
                  key={movie.id}
                  id={movie.id}
                  className={`row__poster${
                    isLargeRow ? ` row__posterLarge` : ``
                  }`}
                  src={`${baseURL}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  alt={movie.title ? movie.title : movie.name}
                  releaseDate={
                    movie.release_date
                      ? movie.release_date
                      : movie.first_air_date
                  }
                />
              ) : (
                <></>
              );
            })}
        </div>
      </div>
    </Wrapper>
  );
}

export default Row;
