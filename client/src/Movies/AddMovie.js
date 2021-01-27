import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const initialValues = {
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: [],
};

const AddMovie = ({ getMovieList }) => {
    const [form, setForm] = useState(initialValues);
    const { push } = useHistory();

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
            .post(`http://localhost:5000/api/movies`, form)
            .then((res) => {
                setForm(initialValues);
                getMovieList();
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

                <button className="md-button form-button">Add</button>
            </form>
        </div>
    );
};

export default AddMovie;
