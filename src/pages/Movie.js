import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../Components/MovieCard";
import { movieAction } from "../redux/action/movieAction";

// Dropdown button
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";

// Filter component
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import MovieCard2 from "../Components/MovieCard2";
import { useLocation } from "react-router-dom";

function Movie() {
  const dispatch = useDispatch();
  const location = useLocation();

  const [activeCategory, setActiveCategory] = useState("Popular");
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [sort, setSort] = useState("Sort");
  const [genre, setGenre] = useState("Genre");
  const [yearRange, setYearRange] = useState({ min: 1900, max: 2023 });
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [moviesToRender, setMoviesToRender] = useState([]);

  const {
    popularMovies,
    topRatedMovies,
    upcomingMovies,
    searchResults,
    genreList,
  } = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(movieAction.getMovies());
  }, []);

  useEffect(() => {
    let moviesToRender;
    if (
      searchResults &&
      searchResults.results &&
      searchResults.results.length
    ) {
      moviesToRender = searchResults.results;
    } else if (activeCategory === "Popular") {
      moviesToRender = popularMovies?.results;
    } else if (activeCategory === "Top Rated") {
      moviesToRender = topRatedMovies?.results;
    } else if (activeCategory === "Upcoming") {
      moviesToRender = upcomingMovies?.results;
    }
    setYearRange({ min: 1900, max: 2023 });
    setMoviesToRender(moviesToRender);
  }, [
    activeCategory,
    popularMovies,
    topRatedMovies,
    upcomingMovies,
    searchResults,
  ]);

  useEffect(() => {
    handleFilter();
  }, [activeCategory, moviesToRender, selectedGenre]);

  // Search
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("search");
    if (searchQuery) {
      dispatch(movieAction.searchMovies(searchQuery));
    }
  }, [dispatch, location.search]);

  const handleActiveCategory = (category) => {
    setActiveCategory(category);
    setSort(category);
    setSelectedGenre(null);

    if (
      searchResults &&
      searchResults.results &&
      searchResults.results.length > 0
    ) {
      const sortedResults = [...searchResults.results].sort((a, b) => {
        if (category === "Popular") {
          return b.popularity - a.popularity;
        } else if (category === "Top Rated") {
          return b.vote_average - a.vote_average;
        } else if (category === "Upcoming") {
          return new Date(a.release_date) - new Date(b.release_date);
        }
        return 0;
      });

      if (selectedGenre) {
        const filteredByGenre = sortedResults.filter((movie) =>
          movie.genre_ids.includes(selectedGenre.id)
        );
        setMoviesToRender(filteredByGenre);
      } else {
        setMoviesToRender(sortedResults);
      }
    }
  };
  // Genre
  const handleGenreSelection = (genre) => {
    setSelectedGenre(genre);
    setGenre(genre.name);
    // Apply genre filter to the moviesToRender
    if (moviesToRender) {
      const filteredByGenre = moviesToRender.filter((movie) =>
        movie.genre_ids.includes(genre.id)
      );
      setFilteredMovies(filteredByGenre);
    }
  };

  //Filter
  const handleFilter = () => {
    if (moviesToRender) {
      let filtered = [...moviesToRender];

      // Apply genre filter if a genre is selected
      if (selectedGenre) {
        filtered = filtered.filter((movie) =>
          movie.genre_ids.includes(selectedGenre.id)
        );
      }
      // Apply year range filter
      filtered = filtered.filter((movie) => {
        const releaseDate = movie.release_date;
        const releaseYear = releaseDate.split("-")[0];
        const minDate = yearRange.min;
        const maxDate = yearRange.max;
        return releaseYear >= minDate && releaseYear <= maxDate;
      });
      setFilteredMovies(filtered);
    }
  };

  const handleYearRangeChange = (value) => {
    setYearRange(value);
    handleFilter();
  };

  return (
    <div className="Movie">
      <div className="drop_down">
        {/* 카테고리 필터 */}
        <DropdownButton
          as={ButtonGroup}
          key="Light"
          id="dropdown-variants-Light"
          variant="light"
          title={sort}
        >
          <Dropdown.Item
            eventKey="1"
            onClick={() => handleActiveCategory("Popular")}
          >
            Popular
          </Dropdown.Item>
          <Dropdown.Item
            eventKey="2"
            onClick={() => handleActiveCategory("Top Rated")}
          >
            Top Rated
          </Dropdown.Item>
          <Dropdown.Item
            eventKey="3"
            onClick={() => handleActiveCategory("Upcoming")}
          >
            Upcoming
          </Dropdown.Item>
        </DropdownButton>

        {/* 년도 필터 */}

        <DropdownButton
          as={ButtonGroup}
          key="Light"
          id="dropdown-variants-Light"
          variant="light"
          title={"Filter"}
        >
          <div className="year_filter">
            <div className="year_range">
              <div>From</div>
              <div>To</div>
            </div>
            <InputRange
              step={5}
              minValue={1900}
              maxValue={2023}
              value={yearRange}
              onChange={handleYearRangeChange}
            />
          </div>
        </DropdownButton>

        {/* 장르 필터 */}
        <div className="genre_box">
          <DropdownButton
            as={ButtonGroup}
            key="Light"
            id="dropdown-variants-Light"
            variant="light"
            title={genre}
          >
            {genreList &&
              genreList.length > 0 &&
              genreList.map((genre) => (
                <Dropdown.Item
                  key={genre.id}
                  onClick={() => handleGenreSelection(genre)}
                >
                  {genre.name}
                </Dropdown.Item>
              ))}
          </DropdownButton>
        </div>
      </div>

      <div className="movie_boxes">
        {filteredMovies && filteredMovies.length > 0
          ? filteredMovies.map((movie) => (
              <div key={movie.id} className="movie_card_container">
                <MovieCard2 movie={movie} />
              </div>
            ))
          : moviesToRender &&
            moviesToRender.map((movie) => (
              <div key={movie.id} className="movie_card_container">
                <MovieCard2 movie={movie} />
              </div>
            ))}
      </div>
    </div>
  );
}

export default Movie;
