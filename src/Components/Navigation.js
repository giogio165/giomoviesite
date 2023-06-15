import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch } from "react-redux";
import { movieAction } from "../redux/action/movieAction";

function Navigation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(movieAction.searchMovies(searchQuery))
      .then(() => {
        navigate(`/movies?search=${searchQuery}`);
      })
      .catch((error) => {
        console.log("Error occurred while searching movies:", error);
      });
  };

  return (
    <div className="NavBar">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">
            <img
              width={50}
              src="data:image/png;base64,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"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link to="/" className="nav_item">
                Home
              </Link>
              <Link to="/movies" className="nav_item">
                Movies
              </Link>
            </Nav>
            <Form className="d-flex" onSubmit={handleSearch}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="danger" type="submit">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navigation;
