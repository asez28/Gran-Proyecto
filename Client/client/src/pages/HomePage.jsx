import React, { useEffect } from "react";
import HomePagescontainer from "../components/HomePagescontainer.jsx";

function HomePage() {
  useEffect(() => {
    document.title = "Welcome";
  }, []);

  return (
    <>
      <link rel="stylesheet" type="text/css" href="/CSS/homePage.css" />
      <video autoPlay muted loop id="bg-video">
        <source src="/IMG/video_games.mp4" type="video/mp4" />
        Tu navegador no admite la reproducción de videos.
      </video>
      <HomePagescontainer />
    </>
  );
}

export default HomePage;
