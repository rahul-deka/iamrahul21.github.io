import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllPosts from "./pages/AllPosts";
import OnePost from "./pages/OnePost";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<AllPosts />} />
        <Route path="/blog/:slug" element={<OnePost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;