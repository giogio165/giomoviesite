import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Badge from "react-bootstrap/Badge";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeopleGroup, faStar } from "@fortawesome/free-solid-svg-icons";

const MovieCard2 = ({ movie }) => {
  const navigate = useNavigate();

  const id = movie.id;
  const movie_year = movie.release_date;
  const { genreList } = useSelector((state) => state.movie);

  return (
    <div
      className="MovieCard2"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})`,
        backgroundSize: "cover",
      }}
      onClick={() => {
        navigate(`/movies/${id}`);
      }}
    >
      <div className="overlay2">
        <div className="movie_card_info">
          <div className="second_movie_card_title_img">
            <div
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})`,
                backgroundSize: "cover",
              }}
              className="movie_card_small_img"
            ></div>
            <div className="second_movie_card_title">
              <h7>{movie.title}</h7>
              <div className="second_movie_card_year">
                {movie_year.split("-")[0]}
              </div>
            </div>
          </div>
          <h7>
            {movie.genre_ids.slice(0, 2).map((id) => (
              <Badge bg="danger">
                {genreList.find((item) => item.id === id).name}
              </Badge>
            ))}
          </h7>
          <div className="second_movie_card_overview">{movie.overview}</div>
          <FontAwesomeIcon icon={faStar} style={{ color: "#ECB445" }} />
          <span className="movie_vote">{movie.vote_average}</span>
          <FontAwesomeIcon icon={faPeopleGroup} style={{ color: "#ffffff" }} />
          <span className="movie_cont">{movie.vote_count}</span>
          <span className="under18">{movie.adult ? "청불" : "Under 18"}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard2;
