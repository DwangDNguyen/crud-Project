import React, { useState } from "react";
import "./update.scss";
import Navbar from "../../components/Navbar/Navbar";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/userSlice";

const Update = () => {
    const { id } = useParams();
    console.log(id);
    const users = useSelector((state) => state.users);
    const userUpdate = users.filter((user) => user.id === Number(id));
    const { name, email, age, address } = userUpdate[0];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const initialValues = {
        id: Number(id),
        name: name,
        email: email,
        age: age,
        address: address,
    };
    const [values, setValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    console.log({ ...values });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormErrors({ ...formErrors, [name]: null });
        setValues({ ...values, [name]: value });
    };
    const handleUpdate = (e) => {
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
            dispatch(updateUser({ ...values }));
            navigate("/");
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
        <div className="update">
            <Navbar />
            <div className="update-container">
                <div className="update-form">
                    <h1>Update user</h1>
                    <form onSubmit={handleUpdate}>
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
                        <button className="update-submit">Update</button>
                        <Link to="/">
                            <span className="cancel-text">Cancel</span>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Update;
