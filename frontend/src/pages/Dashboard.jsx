import React from "react";
import { useState } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icon";
import axios from "axios";

function Dashboard() {
  const [isGatheringImages, setGatheringImages] = false;
  const [accessToken, setAccessToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [songs, setSongs] = useState(null);

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
      axios
        .get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          // Set the user data in the component's state
          setUserData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [accessToken]);

  return (
    <div>
      <h1>{userData.display_name}</h1>
      <Accordion items={items}/>
      <Button
        onclick={() => console.log("works")}
        rightIcon={<ArrowForwardIcon />}
        colorScheme="teal"
        variant="outline"
      />
    </div>
  );
}

export default Dashboard;
