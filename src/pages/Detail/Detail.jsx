import React from "react";
import "./detail.scss";
import Navbar from "../../components/Navbar/Navbar";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const Detail = () => {
    const { id } = useParams();
    console.log(id);
    const users = useSelector((state) => state.users);
    const userUpdate = users.filter((user) => user.id === Number(id));
    const { name, email, age, address } = userUpdate[0];
    return (
        <div className="detail">
            <Navbar />
            <div className="detail-container">
                <div className="user-detail">
                    <h1>User</h1>
                    <div className="user-info">
                        <span>Name: </span> {name}
                    </div>
                    <div className="user-info">
                        <span>Email: </span> {email}
                    </div>
                    <div className="user-info">
                        <span>Age: </span> {age}
                    </div>
                    <div className="user-info">
                        <span>Address: </span> {address}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;
