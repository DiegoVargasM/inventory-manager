import React from "react";
import { RiProductHuntLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./Home.scss";
import invImg from "../../assets/inv-img.jpg";
import {
  ShowOnLogin,
  ShowOnLogout,
} from "../../components/protect/hiddenLinks";

const Home = () => {
  return (
    <div className="home">
      <nav className="container --flex-between ">
        <div className="logo">
          <RiProductHuntLine size={35} />
        </div>

        <ul className="home-links">
          <ShowOnLogout>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/register">Register</Link>
              </button>
            </li>
          </ShowOnLogout>
          <ShowOnLogout>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/log-in">Login</Link>
              </button>
            </li>
          </ShowOnLogout>
          <ShowOnLogin>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/dashboard">Dashboard</Link>
              </button>
            </li>
          </ShowOnLogin>
        </ul>
      </nav>
      <section className="container hero">
        <div className="hero-text">
          <h2>Warehouse Stock Management App</h2>
          <p>
            Inventory system to control and manage warehouse products in real
            time to make it easier to develop your business.
          </p>
          <div className="--flex-start">
            <NumberText num="5000+" text="Brand Owners" />
            <NumberText num="23K+" text="Active Users" />
            <NumberText num="750+" text="Partners" />
          </div>
        </div>

        <div className="hero-image">
          <img src={invImg} alt="Stock_Image" />
        </div>
      </section>
      <section>Carousel</section>
    </div>
  );
};

const NumberText = ({ num, text }) => {
  return (
    <div className="--mr">
      <h3 className="--color-white">{num}</h3>
      <p className="--color-white">{text}</p>
    </div>
  );
};

export default Home;
