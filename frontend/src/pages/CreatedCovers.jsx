import { useState, useEffect } from "react";
import { useLocation, Link } from 'react-router-dom'
import axios from "axios";
import "./CreatedCovers.css";
import houseIcon from '../assets/house.svg'

const CreatedCovers = () => {

  const location = useLocation()
  const [accessToken, setAccessToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userPlaylists, setUserPlaylists] = useState(null)
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

  useEffect(() => {
    const getAccessTokenFromURL = async () => {
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);

      if (params.has("access_token")) {
        const token = params.get("access_token");
        setAccessToken(token);
      }
    };
    getAccessTokenFromURL();
  }, []);

  // Get user Data and user playlist names
  useEffect(() => {
    if (accessToken) {
      const getUserData = axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const getUserPlaylists = axios.get(
        "https://api.spotify.com/v1/me/playlists",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      Promise.all([getUserData, getUserPlaylists])
        .then(([userDataResponse, playlistsResponse]) => {
          setUserData(userDataResponse.data);
          setUserPlaylists(playlistsResponse.data.items);
          const userUrl = "http://127.0.0.1:8000/user/" + userDataResponse.data.display_name
          axios.get(userUrl).then((playlists) => {
            setPlaylistData(playlists.data)
          })
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [accessToken]);

  return (
    <div className="container" style={{ padding:'50px' }}>
      <Link to={`/dashboard#access_token=${accessToken}&token_type=Bearer&expires_in=3600&state=123`} style={{ position:'absolute', top:'50px', right:'50px', filter: 'invert(1)' }} >
        Goto dashboard
        </Link>
      {userData &&
      <h1 className="greeting magic-text">Hi {userData.display_name}, Checkout your Playlist Covers</h1>
      }
        {Object.keys(playlistData).map((value, index) => (
          <div key={index} className="images-viewer">
            <h2 className="playlist-name">
              {value}
            </h2>
            <div className="created-images">
              {playlistData[value].map((image, imageIndex) => (
                <img style={{ cursor: 'pointer' }} key={imageIndex} src={`http://127.0.0.1:8000/image/${image}`} onClick={(e)=>{window.open(`http://127.0.0.1:8000/download/${image}`, '_blank');}}/>
              ))}
            </div>
          </div>
      ))}
    </div>
  );
};

export default CreatedCovers;
