import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';


function AboutUs() {

  useEffect(() => {
    document.body.classList.add('hide-navbar', 'hide-footer');

    return () => {
      document.body.classList.remove('hide-navbar', 'hide-footer');
    };
  }, []);

  useEffect(() => {
    var typed = new window.Typed(".multiple-text", {
      strings: ["Online Game Store", "House of Gamers", "The Best Election"],
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 1000,
      loop: true
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div style={{
      backgroundColor: "#1f242d",
      minHeight: "100vh"
    }}>
      <link rel="stylesheet" type="text/css" href="/CSS/about-us.css" />
      <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'/>
      <div className='d-flex justify-content-between p-4 m-2'>
      <Link to="/" className="logo">Game Zone 🎮</Link>

      <nav className="navbar1">
        <Link to="/" style={{ '--i': 1 }}>Home</Link>
        <Link to="/shop" style={{ '--i': 2 }}>Shopping Cart</Link>
        <Link to="/checkout" style={{ '--i': 3 }}>Sent me</Link>
        <Link to="/gallery" style={{ '--i': 4 }}>Gallery</Link>
        <Link to="/about-us" style={{ '--i': 5 }} className="active">About Us</Link>
      </nav>
      </div>
      <section className="home">
        <div className="home-content">
            <h3>Hellow, We are</h3>
            <h1>Game Zone 🎮</h1>
            <h3>And we are <span className="multiple-text"></span></h3>
            <p>We are a game store for consoles, we can distribute to all part of Israel at better prices. You can find the best games of the year and the best we send them home, Always bringing new Games to the market and bringing you closer to a world where the player undoubtedly has a large number of options to choose from. from the best shooting, action, arcade and sports games. all on one page Game Zone!</p>
            <div className="social-media">
                <a href="https://www.facebook.com" style={{ '--i': 6 }}><i className='bx bxl-facebook'></i></a>
                <a href="http://x.com" style={{ '--i': 7 }}><i class='bx bx-x'></i></a>
                <a href="https://www.instagram.com" style={{ '--i': 8 }}><i className='bx bxl-instagram-alt' ></i></a>
                <a href="https://web.whatsapp.com" style={{ '--i': 9 }}><i className='bx bxl-whatsapp' ></i></a>
            </div>
        </div>
        <div className="home-img">
          <img src="/IMG/logo.png" alt="" />   
        </div>
      </section>
    </div>
  );
}

export default AboutUs;

