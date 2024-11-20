import React, { useState, useEffect } from "react";
import MovieDataService from "../services/movies";
import { useParams, Link } from "react-router-dom";
import { Card, Container, Col, Row, Button, Image } from 'react-bootstrap';
import moment from 'moment';

const Movie = (props) => {
    const [movie, setMovie] = useState({
        id: null,
        title: "",
        rated: "",
        reviews: []
    });

    const { id } = useParams();

    const getMovie = id => {
        MovieDataService.get(id).then(response => {
            setMovie(response.data);
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    const deleteReview = (reviewId) => {
        if (window.confirm("Are you sure you want to delete this review?")) {
            MovieDataService.deleteReview(reviewId, props.user.id)
                .then(response => {
                    setMovie(prevMovie => ({
                        ...prevMovie,
                        reviews: prevMovie.reviews.filter(review => review._id !== reviewId)
                    }));
                    console.log("Review deleted successfully", response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }

    useEffect(() => {
        getMovie(id);
    }, [id]);

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Image src={movie.poster + "100px250"} fluid />
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header as='h5'>{movie.title}</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    {movie.plot}
                                </Card.Text>
                                {props.user &&
                                    <Link to={"/movies/" + id + "/review"}>
                                        Add Review
                                    </Link>}
                            </Card.Body>
                        </Card>
                        <h2 style={{ margin: '15px' }}>Reviews</h2>
                        <br />
                        {movie.reviews.map((review, index) => {
                            return (
                                <Card key={index} style={{ marginBottom: '15px' }}>
                                    <Card.Body>
                                        <Row className="align-items-center">
                                            <Col>
                                                <h5>{review.name + " reviewed on "} {moment(review.date).format("Do MMMM YYYY")}</h5>
                                                <p>{review.review}</p>
                                                {props.user && props.user.id === review.user_id && (
                                                    <Row>
                                                        <Col>
                                                            <Link
                                                                to={{
                                                                    pathname: "/movies/" + id + "/review",
                                                                    state: { currentReview: review },
                                                                }}
                                                            >
                                                                Edit
                                                            </Link>
                                                        </Col>
                                                        <Col>
                                                            <Button variant="link" onClick={() => deleteReview(review._id)}>
                                                                Delete
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                )}
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            );
                        })}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Movie;
