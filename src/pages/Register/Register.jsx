import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./register.scss";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
const Register = () => {
    const initialValues = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    };
    const navigate = useNavigate();
    const [values, setValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
        setFormErrors({ ...formErrors, [name]: null });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, lastname, email, username, password, confirmPassword } =
            values;
        setFormErrors(validate(values));
        setIsSubmit(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                toast.success("Account created successfully", {
                    autoClose: 2500,
                });
                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            })
            .catch((error) => {
                toast.error("Account creation failed");
            });
    };
    const validate = (value) => {
        const error = {};
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!value.name) {
            error.name = "Name is required";
        }
        if (!value.email) {
            error.email = "Email is required";
        } else if (!regexEmail.test(value.email)) {
            error.email = "This is not a valid email format";
        }
        if (!value.password) {
            error.password = "Password is required";
        } else if (value.password.length < 6) {
            error.password = "Password must be more than 6 characters";
        }
        if (!value.confirmPassword) {
            error.confirmPassword = "Confirm password is required";
        } else if (value.confirmPassword !== value.password) {
            error.confirmPassword = "Please enter the correct password";
        }
        return error;
    };

    return (
        <div className="register">
            <Navbar />
            <div className="register-container">
                <div className="register-form">
                    <h1>Create an account</h1>
                    <ToastContainer position="top-center" theme="dark" />
                    <form onSubmit={handleSubmit}>
                        <div className="form-input">
                            <label htmlFor="name">Name *</label>
                            <input
                                className="input"
                                type="text"
                                name="name"
                                id="name"
                                value={values.name}
                                onChange={handleChange}
                            />
                            {formErrors.name && (
                                <span className="error">{formErrors.name}</span>
                            )}
                        </div>
                        <div className="form-input">
                            <label htmlFor="email">Email *</label>
                            <input
                                className="input"
                                type="text"
                                name="email"
                                id="email"
                                value={values.email}
                                onChange={handleChange}
                            />
                            {formErrors.email && (
                                <span className="error">
                                    {formErrors.email}
                                </span>
                            )}
                        </div>
                        <div className="form-input">
                            <label htmlFor="password">Password *</label>
                            <input
                                className="input"
                                type="password"
                                name="password"
                                id="password"
                                value={values.password}
                                onChange={handleChange}
                            />
                            {formErrors.password && (
                                <span className="error">
                                    {formErrors.password}
                                </span>
                            )}
                        </div>
                        <div className="form-input">
                            <label htmlFor="confirm-password">
                                Confirm password *
                            </label>
                            <input
                                className="input"
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                value={values.confirmPassword}
                                onChange={handleChange}
                            />
                            {formErrors.confirmPassword && (
                                <span className="error">
                                    {formErrors.confirmPassword}
                                </span>
                            )}
                        </div>
                        <button className="register-submit">Sign up</button>
                        <Link to="/">
                            <span className="cancel-text">Cancel</span>
                        </Link>
                    </form>
                    <div className="redirect-login">
                        <span className="text">Have an account?</span>
                        <Link to="/login">
                            <span className="login-text">Login</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
