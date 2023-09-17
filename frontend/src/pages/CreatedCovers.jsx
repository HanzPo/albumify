import { useState, useEffect } from "react";
import axios from "axios";
import "./CreatedCovers.css";

const CreatedCovers = () => {
  const [userId, setUserId] = useState("Name");
  const [playlistData, setPlaylistData] = useState({
    playlist1: [
      "placeholder.png",
      "placeholder.png",
      "placeholder.png",
      "placeholder.png",
    ],
    playlist2: [
      "placeholder.png",
      "placeholder.png",
      "placeholder.png",
      "placeholder.png",
    ],
    playlist3: [
      "placeholder.png",
      "placeholder.png",
      "placeholder.png",
      "placeholder.png",
    ],
  });

  return (
    <div className="container">
      <div className="nav">
        <a href="/dashboard">
          <button className="create-button">Create</button>
        </a>
      </div>
      <h1 className="greeting">Hi, {userId}</h1>

      {Object.keys(playlistData).map((value, index) => (
        <div key={index} className="images-viewer">
          <h2 className="playlist-name">
            {value}
          </h2>
          <div className="created-images">
            {playlistData[value].map((image, imageIndex) => (
              <img key={imageIndex} src={image} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CreatedCovers;
