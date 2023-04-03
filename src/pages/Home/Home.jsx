import React from "react";
import "./Home.scss";
import Navbar from "../../components/Navbar/Navbar";
import ListUser from "../../components/ListUser/ListUser";
const Home = () => {
    return (
        <div className="home">
            <Navbar />
            <div className="home-container">
                <ListUser />
            </div>
        </div>
    );
};

export default Home;
