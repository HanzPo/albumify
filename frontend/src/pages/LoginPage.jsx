import React, { useState } from 'react'
import './loginPage.css' 
import { Button, ButtonGroup } from '@chakra-ui/react'

function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  const CLIENT_ID = '0db42d67426a47d0bb0265da694bdf5c';
  const REDIRECT_URI = 'http://127.0.0.1:5173/dashboard';

  // Spotify authorization URL
  const spotifyAuthUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user-library-read&response_type=token&state=123`;

  return (
    <>
      <div className="login-container">
        <div className="intro-container" id="intro-type" style={{ height:'100dvh',display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:"center"}}>
          <h1 className="introduction"> Welcome to the Cover Page </h1>
          <p classname="intro2"> Log in With Spotify Below to Get Started </p>
          <div className='spotify-button'>
            <a href={spotifyAuthUrl}><Button className='magic-text' id="login-button" style={{ backgroundColor: 'rgb(143, 183, 244)', color: 'white', margin:"30px"}} variant='outline'>
                  Connect your Spotify
                </Button></a>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage