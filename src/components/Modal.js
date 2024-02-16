import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import Card from "./Card";
import classes from "./stylesheets/Modal.module.css";
import axios from "../axios";
const baseURL = "https://image.tmdb.org/t/p/original/";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm} />;
};

const ModalOverlay = ({ id, onConfirm }) => {
  const [movie, setMovie] = useState();
  const [trailerUrl, setTrailerUrl] = useState("");
  useEffect(() => {
    if (id !== undefined) {
      async function fetchData() {
        const request = await axios.get(
          `movie/${id}?api_key=4ba7879de7dc284639a7739f310bc0c5`
        );
        setMovie(request.data);
        return request;
      }
      fetchData();
    }
  }, [id]);
  useEffect(() => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      // Search for movie trailer full url
      async function fetchVideos() {
        const videos = await axios.get(
          `movie/${id}/videos?api_key=4ba7879de7dc284639a7739f310bc0c5
      `
        );
        const trailer = videos.data.results.filter(
          (video) => video.type === "Trailer"
        );

        // const finalURL = "https://www.youtube.com/watch?v="+trailer[0].key;
        setTrailerUrl(trailer[0].key);
      }
      fetchVideos();
    }
  }, [id, trailerUrl]);

  return (
    movie !== undefined && (
      <Card className={classes.modal}>
        <header className={classes.header}>
          <h2>{movie.title}</h2>
        </header>
        <div className={classes.content}>
          <div>
            <img
              className={classes.poster}
              src={`${baseURL}${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
          <div style={{ padding: "1rem" }}>
            <i style={{ fontSize: "0.7rem" }}>{movie?.tagline}</i>
            <p className={classes.movie__overview}>{movie?.overview}</p>
            <div className={classes.movie__details}>
              <p>Rating: {movie?.vote_average}</p>
              <p>Release Date: {movie?.release_date}</p>
              <p>Runtime: {movie?.runtime} minutes</p>
              <p>
                Genres: {movie?.genres?.map((genre) => genre.name).join(", ")}
              </p>
            </div>
            {trailerUrl && (
              <p>
                Movie trailer:
                <a
                  href={`https://www.youtube.com/watch?v=${trailerUrl}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Click here
                </a>
              </p>
            )}
          </div>
        </div>
        <footer className={classes.actions}>
          <button className={classes.button} onClick={onConfirm}>
            Okay
          </button>
        </footer>
      </Card>
    )
  );
};

const Modal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay id={props.id} onConfirm={props.onConfirm} />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default Modal;
