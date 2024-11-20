import React, { useState, useEffect } from "react";
import MovieDataService from "../services/movies";
import { Link,useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import './movie-list.css'

const MoviesList = (props) => {
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchRating, setSearchRating] = useState("");
  const [ratings, setRatings] = useState(["All Ratings"]);
  const [currentPage, setCurrentPage] = useState(0);
  const [previousPage, setPreviousPage] = useState(0);
  const [entriesPerPage, setEntriesPerPage] = useState(10); 
  const [currentSearchMode, setCurrentSearchMode] = useState("");

  const history = useHistory();

  useEffect(() => {
    retrieveMovies(currentPage);
    retrieveRatings();
  }, []);

  useEffect(() => {
    if (currentSearchMode === "findByTitle") {
      findByTitle(currentPage);
    } else if (currentSearchMode === "findByRating") {
      findByRating(currentPage);
    } else {
      retrieveMovies(currentPage);
    }
  }, [currentPage]);

  const retrieveMovies = (page = 0) => {
    MovieDataService.getAll(page)
      .then((response) => {
        console.log(response.data);
        setMovies(response.data.movies);
        setCurrentPage(response.data.page);
        setEntriesPerPage(response.data.entries_per_page);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveRatings = () => {
    MovieDataService.getRatings()
      .then((response) => {
        console.log(response.data);
        setRatings(["All Ratings"].concat(response.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const onChangeSearchRating = (e) => {
    const searchRating = e.target.value;
    setSearchRating(searchRating);
  };

  const find = (query, by, page = 0) => {
    MovieDataService.find(query, by, page)
      .then((response) => {
        console.log(response.data);
        setMovies(response.data.movies);
        setCurrentPage(response.data.page);
        setEntriesPerPage(response.data.entries_per_page);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByTitle = (page = 0) => {
    setCurrentSearchMode("findByTitle");
    find(searchTitle, "title", page);
  };

  const findByRating = (page = 0) => {
    setCurrentSearchMode("findByRating");
    if (searchRating === "All Ratings") {
      retrieveMovies(page);
    } else {
      find(searchRating, "rated", page);
    }
  };

  const goBackPage = () => {
    if (currentPage > 0) {
      setPreviousPage(currentPage); 
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="App">
      <Container>
        <Form>
          <Row>
            <Col>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Search by title"
                  value={searchTitle}
                  onChange={onChangeSearchTitle}
                />
              </Form.Group>
              <Button variant="primary" type="button" onClick={() => findByTitle(0)}>
                Search
              </Button>
            </Col>
            <Col>
              <Form.Group>
                <Form.Control as="select" onChange={onChangeSearchRating}>
                  {ratings.map((rating, index) => {
                    return (
                      <option value={rating} key={index}>
                        {rating}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="button" onClick={() => findByRating(0)}>
                Search
              </Button>
            </Col>
          </Row>
        </Form>
        <Container>
            <div className="movies-list-grid">
                {movies.map((movie) => (
                <Card className="movies-list-card" key={movie._id}>
                    <Card.Img
                    variant="top"
                    src={
                        movie.poster && movie.poster !== "no-image"
                        ? movie.poster + "/100px180"
                        : "/no-image.png"
                    }
                    alt={movie.title || "No image available"}
                    />
                    <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>Rating: {movie.rated}</Card.Text>
                    <Card.Text>{movie.plot}</Card.Text>
                    <Link to={"/movies/" + movie._id}>View Details</Link>
                    </Card.Body>
                </Card>
                ))}
            </div>
        </Container>
        <br />
        {currentPage > 0 && (
          <Button
            variant="link"
            onClick={goBackPage}>
            Go Back
          </Button>
        )}
        <div>
          Showing page: {currentPage + 1}.
          <Button
            variant="link"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={movies.length < entriesPerPage} 
          >
            Get next {entriesPerPage} results
          </Button>
        </div>
      </Container>
    </div>
  );
};
export default MoviesList;
