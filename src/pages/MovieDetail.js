import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { movieAction } from "../redux/action/movieAction";
import YouTube from "react-youtube";

import RelatedMoves from "../Components/RelatedMoves";

import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";

function MovieDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [reviews, setReviews] = useState([]);
  const [relatedMovies, setRelatedMovies] = useState([]);

  const [reviewClick, setReviewClick] = useState(false);

  const [trailerClick, setTrailerClick] = useState(false);

  const [trailer, setTrailer] = useState("");

  const handleShow = () => setTrailerClick(true);
  const handleClose = () => setTrailerClick(false);

  const reviewbutton = () => {
    setReviewClick(!reviewClick);
  };

  const { popularMovies, topRatedMovies, upcomingMovies, loading, genreList } =
    useSelector((state) => state.movie);

  const fetchReviews = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=fcdcf37d8779f435786606a2ddd02898`
      );
      const data = await response.json();
      setReviews(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRelatedMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=fcdcf37d8779f435786606a2ddd02898`
      );
      const data = await response.json();
      setRelatedMovies(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTrailer = async () => {
    try {
      const response = await fetch(`
      https://api.themoviedb.org/3/movie/${id}/videos?api_key=fcdcf37d8779f435786606a2ddd02898`);
      const data = await response.json();
      setTrailer(data.results.find((it) => it.type === "Trailer").key);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(movieAction.getMovies());
    fetchReviews();
    fetchRelatedMovies();
  }, []);

  useEffect(() => {
    fetchTrailer();
  }, [trailerClick]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const movie =
    popularMovies.results.find((movie) => movie.id === parseInt(id)) ||
    topRatedMovies.results.find((movie) => movie.id === parseInt(id)) ||
    upcomingMovies.results.find((movie) => movie.id === parseInt(id));

  if (!movie) {
    return <div>Movie not found</div>;
  }
  console.log(movie);
  return (
    <div className="MovieDetail">
      <div className="detail_container">
        <div
          className="detail_img"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})`,
            backgroundSize: "cover",
          }}
        ></div>
        <div className="detail_word">
          <div className="badges">
            {movie.genre_ids.map((id) => (
              <Badge bg="danger" className="badge">
                {genreList.find((item) => item.id === id).name}
              </Badge>
            ))}
          </div>
          <h2>{movie.title}</h2>
          <hr />
          <div className="detail_overview">{movie.overview}</div>
          <hr />

          <span
            className="trailer"
            onClick={() => {
              handleShow();
            }}
          >
            <FontAwesomeIcon icon={faFilm} />
            Watch Trailer
          </span>

          {trailerClick ? (
            <div className="trailer">
              <Modal size="lg" show={trailerClick} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <YouTube videoId={trailer} />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="review">
        <Button
          variant="danger"
          onClick={() => {
            reviewbutton();
          }}
        >
          REVIEW({reviews.length})
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            reviewbutton();
          }}
        >
          RELATED MOVIES
        </Button>

        {reviewClick && reviews.length > 0 ? (
          <ul>
            {reviews.map((review) => (
              <li key={review.id}>
                <h4>{review.author}</h4>
                <p>{review.content}</p>
                <hr />
              </li>
            ))}
          </ul>
        ) : (
          <RelatedMoves relatedMovies={relatedMovies} />
        )}
      </div>
    </div>
  );
}

export default MovieDetail;
