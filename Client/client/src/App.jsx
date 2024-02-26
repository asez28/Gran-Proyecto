import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/shop" element={<h1>Shop</h1>} />
        <Route path="/checkout" element={<h1>checkout</h1>} />
        <Route path="/profile" element={<h1>Profile</h1>} />
        <Route path="/gallery" element={<h1>Gallery</h1>} />
        <Route path="/about-us" element={<h1>About Us</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
