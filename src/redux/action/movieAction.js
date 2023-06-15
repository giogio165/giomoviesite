import api from "../api";
// const API_KEY = process.env.REACT_APP_API_KEY;

function getMovies() {
  return async (dispatch) => {
    try {
      dispatch({
        type: "GET_MOVIES_REQUEST",
      });

      const popularMovieApi = api.get(
        `/movie/popular?api_key=fcdcf37d8779f435786606a2ddd02898&language=en-US&page=1`
      );
      const topRatedApi = api.get(
        `/movie/top_rated?api_key=fcdcf37d8779f435786606a2ddd02898&language=en-US&page=1`
      );
      const upcomingApi = api.get(
        `/movie/upcoming?api_key=fcdcf37d8779f435786606a2ddd02898&language=en-US&page=1`
      );

      const genreApi = api.get(
        `/genre/movie/list?api_key=fcdcf37d8779f435786606a2ddd02898&language=en-US`
      );

      let [popularMovies, topRatedMovies, upcomingMovies, genreList] =
        await Promise.all([
          popularMovieApi,
          topRatedApi,
          upcomingApi,
          genreApi,
        ]);

      dispatch({
        type: "GET_MOVIE_SUCCESS",
        payload: {
          popularMovies: popularMovies.data,
          topRatedMovies: topRatedMovies.data,
          upcomingMovies: upcomingMovies.data,
          genreList: genreList.data.genres,
        },
      });
    } catch (error) {
      // 에러핸들링
      dispatch({ type: "GET_MOVIE_FAIL" });
    }
  };
}
function searchMovies(query) {
  return async (dispatch) => {
    try {
      dispatch({
        type: "SEARCH_MOVIES_REQUEST",
      });

      const searchApi = api.get(
        `/search/movie?api_key=fcdcf37d8779f435786606a2ddd02898&language=en-US&query=${query}&page=1`
      );

      const searchResults = await searchApi;

      dispatch({
        type: "SEARCH_MOVIES_SUCCESS",
        payload: {
          searchResults: searchResults.data,
        },
      });
    } catch (error) {
      // Error handling
      dispatch({ type: "SEARCH_MOVIES_FAIL" });
    }
  };
}

//연관성이 없는 데이터, 병렬로 한꺼번에 불러도 된다. 연관되는 데이터면 그냥 await 써야댐 Promise.all로!
export const movieAction = { getMovies, searchMovies };
