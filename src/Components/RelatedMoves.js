import React from "react";

const RelatedMovies = ({ relatedMovies }) => {
  return (
    <div className="RelatedMovies">
      {relatedMovies.map((movie) => (
        <div className="movie_container" key={movie.id}>
          <div className="movie_title">{movie.title}</div>
          {movie.poster_path && (
            <img
              className="movie_img"
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title}
              style={{ width: "200px" }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default RelatedMovies;
