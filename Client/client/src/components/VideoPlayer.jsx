import { useEffect, useRef } from "react";
import videojs from "video.js";
import "videojs-youtube";
import "video.js/dist/video-js.css";

const initialOptions = {
  controls: true,
  fluid: true,
  controlBar: {
    volumePanel: {
      inline: false
    }
  }
};

const videoJsOptions = {
  sources: [
    {
      type: "video/youtube",
      src: "https://www.youtube.com/watch?v=x_CHl1yTDHg"
    }
  ]
};

const VideoPlayer = () => {
  const videoNode = useRef(null);
  const player = useRef(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (videoNode.current && !initialized.current) {
      initialized.current = true; // Evitar inicialización duplicada
      player.current = videojs(videoNode.current, {
        ...initialOptions,
        ...videoJsOptions
      }).ready(function () {
      });
    }

    return () => {
      if (player.current) {
        player.current.dispose();
      }
    };
  }, []);

  return (
    <div className="video col-lg-5 col-md-6 p-5">
    <link
  href="https://unpkg.com/@videojs/themes@1/dist/sea/index.css"
  rel="stylesheet"
/>
      <h4>BEST GAMES OF 2023</h4>
      <video ref={videoNode} className="video-js vjs-theme-sea" />
    </div>
  );
};

export default VideoPlayer;
