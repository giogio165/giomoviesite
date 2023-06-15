import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Badge from "react-bootstrap/Badge";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faStar } from "@fortawesome/free-solid-svg-icons";

const MovieCard = ({ it }) => {
  const { genreList } = useSelector((state) => state.movie);

  const id = it.id;

  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${it.poster_path})`,
        backgroundSize: "cover",
      }}
      className="movie_card"
      onClick={() => {
        navigate(`/movies/${id}`);
      }}
    >
      <div className="overlay">
        <div className="movie_card_title">{it.title}</div>
        <div className="movie_card_badges">
          {it.genre_ids.map((id) => (
            <Badge bg="danger" className="overlay_badge">
              {genreList.find((item) => item.id === id).name}
            </Badge>
          ))}
        </div>
        <div className="movie_card_info">
          <FontAwesomeIcon icon={faStar} style={{ color: "#ffffff" }} />
          <span>{it.vote_average}</span>
          <FontAwesomeIcon icon={faUser} style={{ color: "#ffffff" }} />
          <span>{it.adult ? "청불" : "Under 18"}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
