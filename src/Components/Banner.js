import React from "react";

function Banner({ movie }) {
  //   const imageUrl = `https://image.tmdb.org/t/p/original${movie.poster_path}`;

  return (
    <div
      className="banner"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})`,
        backgroundSize: "cover",
      }}
    >
      <div className="banner_info">
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
      </div>
    </div>
  );
}

export default Banner;
