import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const intialValues = {
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: [],
};
const UpdateMovie = ({ movieList, setMovieList }) => {
    const { id } = useParams();
    const { push } = useHistory();
    const [form, setForm] = useState(intialValues);
    useEffect(() => {
        console.log(id);
        axios.get(`http://localhost:5000/api/movies/${id}`).then((res) => {
            setForm(res.data);
        });
    }, []);

    const changeHandler = (e) => {
        //ev.persist();
        let value = e.target.value;
        if (e.target.name === "stars") {
            value = e.target.value.split(",");
        }
        setForm({
            ...form,
            [e.target.name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${id}`, form)
            .then((res) => {
                setForm(intialValues);
                setMovieList(
                    movieList.map((movie) => {
                        if (movie.id === form.id) {
                            return form;
                        }
                        return movie;
                    })
                );
                push(`/`);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    onChange={changeHandler}
                    placeholder="title"
                    value={form.title}
                />
                <div className="baseline" />

                <input
                    type="number"
                    name="metascore"
                    onChange={changeHandler}
                    placeholder="metascore"
                    value={form.metascore}
                />
                <div className="baseline" />

                <input
                    type="string"
                    name="director"
                    onChange={changeHandler}
                    placeholder="director"
                    value={form.director}
                />
                <div className="baseline" />

                <input
                    type="text"
                    name="stars"
                    onChange={changeHandler}
                    placeholder="stars"
                    value={form.stars.toString()}
                />
                <div className="baseline" />

                <button className="md-button form-button">Update</button>
            </form>
        </div>
    );
};

export default UpdateMovie;
