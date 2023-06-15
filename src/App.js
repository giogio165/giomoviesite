import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Movie from "./pages/Movie";
import MovieDetail from "./pages/MovieDetail";
import Navigation from "./Components/Navigation";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movie />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
      </Routes>
    </div>
  );
}
export default App;
