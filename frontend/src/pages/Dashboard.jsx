import React from "react";
import { useState } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@chakra-ui/react";
import axios from "axios";

function Dashboard() {
  const [isGatheringImages, setGatheringImages] = false;
  const [accessToken, setAccessToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userSongs, setSongs] = useState(null);
  const [userPlaylists, setUserPlaylists] = useState(null)

  // get accesstoken from the url
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

  // Get user Data (speicfically name)
  useEffect(() => {
    if (accessToken) {
      const getUserData = axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const getUserPlaylist = axios.get(
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
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [accessToken]);

  return (
    <div>
      <h1>{userData.display_name}</h1>
      {/* This entire component will be mapped over for each element in the userPlaylists array state */}
      <Accordion>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex='1' textAlign='left'>
                Section 1 title
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex='1' textAlign='left'>
                Section 2 title
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default Dashboard;
