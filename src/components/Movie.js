import React from "react";
import "./stylesheets/Movie.css";
const Movie = ({
  src,
  alt,
  className,
  handleClick,
  releaseDate,
  id,
  isLargeRow,
}) => {
  const release = releaseDate;
  const year = release.slice(0, 4);
  return (
    <div
      className="movie"
      onClick={() => {
        if (!isLargeRow) handleClick(id);
      }}
    >
      <img className={className} src={src} alt={alt} />
      <h1 className="movie__title">{alt}</h1>
      <p className="movie__year">{year}</p>
    </div>
  );
};

export default Movie;
