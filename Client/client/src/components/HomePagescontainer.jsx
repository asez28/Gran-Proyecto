import React from "react";
import { Link } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";

const HomePagescontainer = () => {
  return (
    <div className="container" style={{ paddingTop: "120px"}}>
      <div className="row text-center">
        <div
          className="card col-lg-4 col-md-6 mt-5 text-white"
          style={{
            backgroundColor: "rgba(126, 126, 126, 0.171)",
            backdropFilter: "blur(5px)",
          }}
        >
          <img
            src="./IMG/most-popular-video-games-of-2022-1642612227.png"
            className="card-img-top p-1"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Shopping Cart 🛒</h5>
            <p className="card-text">
              You can enter and choose from the variety of games that we offer
              in our store, for Xbox, Playstation or PC. You can find from the
              last Fifa to the last Call of duty. The Best: AT GREAT PRICES!{" "}
            </p>
            <button className="glowing-btn">
                <Link to="shop" className="glowing-txt text-white">ENTER!</Link>
            </button>
          </div>
        </div>
        <VideoPlayer/>
        <div className="col-lg-3 col-md-12 mt-3">
        <h4 className="text-warning bg-dark">TOP SALES</h4>
        <img className="picture p-1" src="./IMG/CODMW3.jpg" style={{ width: '80px' }} />
        <img className="picture p-1" src="./IMG/FC24.jpg" style={{ width: '80px' }} />
        <img className="picture p-1" src="./IMG/TEKKEN8.jpg" style={{ width: '80px' }} />
        <img className="picture p-1" src="./IMG/GOW.jpg" style={{ width: '80px' }} />
        <br />
        <a className="glowing-btn btn text-white" style={{ backdropFilter: 'blur(7px)' }}>
          SEE MORE
        </a>
      </div>
      
      </div>
    </div>
  );
};

export default HomePagescontainer;
