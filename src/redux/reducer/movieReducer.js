let initaialState = {
  popularMovies: {},
  topRatedMovies: {},
  upcomingMovies: {},
  genreList: {},
  movieId: "",
  searchResults: {},
  loading: true,
};
function movieReducer(state = initaialState, action) {
  let { type, payload } = action;
  switch (type) {
    case "GET_MOVIES_REQUEST":
      return { ...state, loading: true };

    case "GET_MOVIE_SUCCESS":
      return {
        ...state,
        popularMovies: payload.popularMovies,
        topRatedMovies: payload.topRatedMovies,
        upcomingMovies: payload.upcomingMovies,
        genreList: payload.genreList,
        loading: false,
      };

    case "GET_MOVIE_FAIL":
      return { ...state, loading: true };
    case "SEARCH_MOVIES_REQUEST":
      return { ...state, loading: true };

    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        searchResults: payload.searchResults,
        loading: false,
      };

    case "SEARCH_MOVIES_FAIL":
      return { ...state, loading: false };

    default:
      return { ...state };
  }
}

export default movieReducer;
