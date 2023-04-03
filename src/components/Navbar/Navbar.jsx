import React from "react";
import Logo from "../../Assets/Img/logo.png";
import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/personSlice.js";

const Navbar = () => {
    const person = useSelector((state) => state.person);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
        console.log(person);
    };
    return (
        <div className="navbar">
            <Link to="/">
                <div className="logo">
                    <img src={Logo} alt="logo" />
                </div>
            </Link>
            <div className="right">
                {person.person && (
                    <Link to="/create">
                        <div className="btn create-btn">Create</div>
                    </Link>
                )}
                {person.person ? (
                    <div className="btn login-btn" onClick={handleLogout}>
                        Logout
                    </div>
                ) : (
                    <Link to="/login">
                        <div className="btn login-btn">Login</div>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
