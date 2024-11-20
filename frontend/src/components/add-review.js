import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import MovieDataService from "../services/movies";
import { Form, Button } from "react-bootstrap";

const AddReview = (props) => {
    const { id } = props.match.params;
    const location = useLocation();

    const editing = location.state?.currentReview ? true : false;
    const initialReviewState = location.state?.currentReview?.review || "";

    const [review, setReview] = useState(initialReviewState);
    const [submitted, setSubmitted] = useState(false);

    const onChangeReview = e => {
        const review = e.target.value;
        setReview(review);
    }

    const saveReview = () => {
        const data = {
            review,
            name: props.user.name,
            user_id: props.user.id,
            movie_id: id,
        };

        if (editing) {
            data.review_id = location.state.currentReview._id;
            MovieDataService.updateReview(data)
                .then(response => {
                    setSubmitted(true);
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        } else {
            MovieDataService.createReview(data)
                .then(response => {
                    setSubmitted(true);
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }

    return (
        <div>
            {submitted ? (
                <div>
                    <h4>Review submitted successfully</h4>
                    <Link to={`/movies/${id}`}>Back to Movie</Link>
                </div>
            ) : (
                <Form>
                    <Form.Group>
                        <Form.Label>{editing ? "Edit" : "Create"} Review</Form.Label>
                        <Form.Control 
                            type="text" 
                            required 
                            value={review} 
                            onChange={onChangeReview} 
                        />
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={saveReview}>
                        Submit
                    </Button>
                </Form>
            )}
        </div>
    );
}

export default AddReview;
