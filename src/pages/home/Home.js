import React from "react";
import Slider from "../Slider";
import Footer from "../Footer";
import Header from "../Header";
import './home.css';
//import Sidebar from "../../sidebar/Sidebar";
//import Login from "../login/Login";

const Home = () => {
    return (
        <div className="parent">
            <Header />
            <Slider />
            <Footer/>
        </div>
    )
}
export default Home;