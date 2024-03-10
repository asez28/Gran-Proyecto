import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "../api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const [userData, setUserData] = useState({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const response = await axios.get("/profile");
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    }

    fetchUserProfile();
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeNavbar = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {" "}
      <link rel="stylesheet" type="text/css" href="/CSS/navbar.css" />
      <link rel="stylesheet" type="text/css" href="/CSS/button.css" />
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <img
            className="navbar-brand"
            width="80"
            src="/IMG/logo.png"
            alt="Game Zone Logo"
          />
          <Link to="/"><h1 className="navbar-brand">Game Zone 🎮</h1></Link>
          <FontAwesomeIcon
            icon={faBars}
            className="menu-hamburger"
            onClick={toggleMobileMenu}
          />
          <div className="nav-linkscloss">
            {isAuthenticated ? (
              <ul className="navbar-nav">
                <NavItem to="/" exact onClick={closeNavbar}>
                  Home
                </NavItem>
                <NavItem to="/shop">Shop</NavItem>
                <NavItem to="/checkout">Checkout</NavItem>
                <NavItem to="/gallery">Gallery</NavItem>
                <NavItem to="/about-us">About Us</NavItem>
                <Link to="/profile">
                  <img
                    width={50}
                    src={userData.imageProfile}
                    alt="User Profile"
                    style={{ borderRadius: "25px" }}
                  />
                </Link>
                <button className="Btn2 m-2" onClick={() => {
                    logout();
                  }}>
                    <div className="sign">
                      <svg viewBox="0 0 512 512">
                        <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                      </svg>
                    </div>
                  <div className="text">Logout</div>
                </button>
              </ul>
            ) : (
              <ul className="links navbar-nav">
                <NavItem className="nav-link" to="/login">
                  Login
                </NavItem>
                <NavItem className="nav-link" to="/register">
                  Register
                </NavItem>
                <NavItem to="/gallery">Gallery</NavItem>
                <NavItem to="/about-us">About Us</NavItem>
              </ul>
            )}
          </div>
        </div>
      </nav>
      <nav
        className={`nav-links ${isMobileMenuOpen ? "mobile-menu-open" : ""}`}
      >
        {isAuthenticated ? (
          <ul className="navbar-nav">
            <NavItem to="/" exact onClick={closeNavbar}>
              Home
            </NavItem>
            <NavItem to="/shop" onClick={closeNavbar}>
              Shop
            </NavItem>
            <NavItem to="/checkout" onClick={closeNavbar}>
              Checkout
            </NavItem>
            <NavItem to="/gallery" onClick={closeNavbar}>
              Gallery
            </NavItem>
            <NavItem to="/about-us" onClick={closeNavbar}>
              About Us
            </NavItem>
            <Link to="/profile">
              <img
                width={50}
                src={userData.imageProfile}
                alt="User Profile"
                style={{ borderRadius: "25px" }}
              />
            </Link>
            <button className="Btn2 m-2">
              <div className="sign">
                <svg viewBox="0 0 512 512">
                  <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                </svg>
              </div>
              <div className="text">Logout</div>
            </button>
          </ul>
        ) : (
          <ul className="links navbar-nav">
            <NavItem className="nav-link" to="/login" onClick={closeNavbar}>
              Login
            </NavItem>
            <NavItem className="nav-link" to="/register" onClick={closeNavbar}>
              Register
            </NavItem>
            <NavItem to="/gallery" onClick={closeNavbar}>
              Gallery
            </NavItem>
            <NavItem to="/about-us">About Us</NavItem>
          </ul>
        )}
      </nav>
    </>
  );
}

function NavItem({ to, exact, children, onClick }) {
  return (
    <li className="nav-item">
      <NavLink className="nav-link" to={to} exact={exact} onClick={onClick}>
        {children}
      </NavLink>
    </li>
  );
}
