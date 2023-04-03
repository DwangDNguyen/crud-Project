import React, { useState } from "react";
import "./create.scss";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../redux/userSlice";
const Create = () => {
    const initialValues = {
        id: "",
        name: "",
        email: "",
        age: "",
        address: "",
    };
    const [values, setValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const users = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
        setFormErrors({ ...formErrors, [name]: null });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const { id, name, email, age, address } = values;
        setFormErrors(validate(values));
        console.log(formErrors);
        if (
            formErrors.name === null ||
            formErrors.email === null ||
            formErrors.age === null ||
            formErrors.address === null
        ) {
            if (users.length === 0) {
                dispatch(
                    addUser({
                        ...values,
                        id: 1,
                    })
                );
                navigate("/");
            } else {
                dispatch(
                    addUser({
                        ...values,
                        id: users[users.length - 1].id + 1,
                    })
                );
                navigate("/");
            }
        }
    };
    const validate = (value) => {
        const error = {};
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!value.name) {
            error.name = "Please enter this information";
        }
        if (!value.email) {
            error.email = "Please enter this information";
        } else if (!regexEmail.test(value.email)) {
            error.email = "This is not a valid email format";
        }
        if (!value.age) {
            error.age = "Please enter this information";
        }
        if (!value.address) {
            error.address = "Please enter this information";
        }
        return error;
    };
    return (
        <div className="create">
            <Navbar />
            <div className="create-container">
                <div className="create-form">
                    <h1>Create user</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-input">
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={values.name}
                                autoComplete="off"
                                placeholder="Name"
                                onChange={handleChange}
                                className="input"
                            />
                            {formErrors.name && (
                                <span className="error">{formErrors.name}</span>
                            )}
                        </div>
                        <div className="form-input">
                            <input
                                type="text"
                                name="email"
                                id="email"
                                value={values.email}
                                autoComplete="off"
                                placeholder="Email"
                                onChange={handleChange}
                                className="input"
                            />
                            {formErrors.email && (
                                <span className="error">
                                    {formErrors.email}
                                </span>
                            )}
                        </div>
                        <div className="form-input">
                            <input
                                type="number"
                                name="age"
                                id="age"
                                value={values.age}
                                autoComplete="off"
                                placeholder="Age"
                                onChange={handleChange}
                                className="input"
                            />
                            {formErrors.age && (
                                <span className="error">{formErrors.age}</span>
                            )}
                        </div>
                        <div className="form-input">
                            <input
                                type="text"
                                name="address"
                                id="address"
                                value={values.address}
                                autoComplete="off"
                                placeholder="Address"
                                onChange={handleChange}
                                className="input"
                            />
                            {formErrors.address && (
                                <span className="error">
                                    {formErrors.address}
                                </span>
                            )}
                        </div>
                        <button className="create-submit">Create</button>
                        <Link to="/">
                            <span className="cancel-text">Cancel</span>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Create;
