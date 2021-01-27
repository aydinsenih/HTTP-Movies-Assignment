import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, getMovieList }) {
    const [movie, setMovie] = useState(null);
    const params = useParams();
    const { push } = useHistory();

    const fetchMovie = (id) => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then((res) => setMovie(res.data))
            .catch((err) => console.log(err.response));
    };

    const saveMovie = () => {
        addToSavedList(movie);
    };

    const updateMovie = (e) => {
        e.preventDefault();
        push(`/update-movie/${params.id}`);
    };

    const deleteMovie = (e) => {
        axios
            .delete(`http://localhost:5000/api/movies/${params.id}`)
            .then((res) => {
                getMovieList();
                push("/");
            })
            .catch((err) => console.log(err.response));
    };

    useEffect(() => {
        fetchMovie(params.id);
    }, [params.id]);

    if (!movie) {
        return <div>Loading movie information...</div>;
    }

    return (
        <div className="save-wrapper">
            <MovieCard movie={movie} />

            <div className="save-button" onClick={saveMovie}>
                Save
            </div>
            <div className="save-button2" onClick={updateMovie}>
                Update
            </div>
            <div className="save-button3" onClick={deleteMovie}>
                Delete
            </div>
        </div>
    );
}

export default Movie;
