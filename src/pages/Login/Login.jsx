import React, { useState } from "react";
import "./login.scss";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/personSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
    const initialValues = {
        email: "",
        password: "",
    };
    const [values, setValues] = useState(initialValues);
    const [show, setShow] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleShow = () => setShow(true);
    const handleHide = () => setShow(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
        setFormErrors({ ...formErrors, [name]: null });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = values;
        setFormErrors(validate(values));
        setIsSubmit(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                dispatch(loginSuccess(user));
                toast.success("Sign in successful!!", {
                    autoClose: 2500,
                });
                setTimeout(() => {
                    navigate("/");
                }, 3000);
            })
            .catch((error) => {
                toast.error("Sign in failed!!");
            });
    };
    const validate = (value) => {
        const error = {};
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!value.email) {
            error.email = "Email is required";
        } else if (!regexEmail.test(value.email)) {
            error.email = "This is not a valid email format";
        }
        if (!value.password) {
            error.password = "Password is required";
        }
        return error;
    };
    return (
        <div className="login">
            <Navbar />
            <div className="login-container">
                <div className="login-form">
                    <h1>Sign in</h1>
                    <ToastContainer position="top-center" theme="dark" />
                    <form onSubmit={handleSubmit}>
                        <div className="form-input">
                            <label htmlFor="email">Email address *</label>
                            <input
                                type="text"
                                className="input"
                                name="email"
                                id="email"
                                onChange={handleChange}
                                value={values.email}
                            />
                            {formErrors.email && (
                                <span className="error">
                                    {formErrors.email}
                                </span>
                            )}
                        </div>
                        <div className="form-input">
                            <label htmlFor="password">Password *</label>
                            {show ? (
                                <div className="input-field">
                                    <input
                                        type="text"
                                        className="input"
                                        name="password"
                                        id="password"
                                        onChange={handleChange}
                                        value={values.password}
                                    />
                                    <div
                                        className="ic icon-show"
                                        onClick={handleHide}
                                    >
                                        <VisibilityIcon />
                                    </div>
                                </div>
                            ) : (
                                <div className="input-field">
                                    <input
                                        type="password"
                                        className="input"
                                        name="password"
                                        id="password"
                                        onChange={handleChange}
                                        value={values.password}
                                    />
                                    <div
                                        className="ic icon-hide"
                                        onClick={handleShow}
                                    >
                                        <VisibilityOffIcon />
                                    </div>
                                </div>
                            )}

                            {formErrors.password && (
                                <span className="error">
                                    {formErrors.password}
                                </span>
                            )}
                        </div>
                        <button className="login-submit">Sign in</button>
                        <Link to="/">
                            <span className="cancel-text">Cancel</span>
                        </Link>
                    </form>
                    <div className="redirect-register">
                        <span className="text">Don’t have an account?</span>
                        <Link to="/register">
                            <span className="register-text">Register</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
