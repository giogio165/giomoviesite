import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../Components/Banner";
import { movieAction } from "../redux/action/movieAction";
import MovieSlid from "../Components/MovieSlid";
import ClipLoader from "react-spinners/ClipLoader";

function Home() {
  const dispatch = useDispatch();

  const { popularMovies, topRatedMovies, upcomingMovies, loading } =
    useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(movieAction.getMovies());
  }, []);
  // 로딩스피너
  if (loading) {
    return <ClipLoader color="#000000" loading={loading} size={150} />;
    //loading 이 true 면 보여주고 false 면 data를 보여주면 된다
    // true일때: data 도착 전 false: data 도착 후, error가 났을 때
  }
  return (
    <div className="Home">
      <Banner movie={popularMovies.results[0]} />
      <h1>Popular Movie</h1>
      <MovieSlid movie={popularMovies} />
      <h1>Top Rated Movie</h1>
      <MovieSlid movie={topRatedMovies} />
      <h1>Upcoming Movie</h1>
      <MovieSlid movie={upcomingMovies} />
    </div>
  );
}

export default Home;
