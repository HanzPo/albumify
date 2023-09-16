import React, { useState } from 'react'
import { Button, ButtonGroup } from '@chakra-ui/react'

function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  const CLIENT_ID = '0db42d67426a47d0bb0265da694bdf5c';
  const REDIRECT_URI = 'http://127.0.0.1:5173/dashboard';

  // Spotify authorization URL
  const spotifyAuthUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user-library-read&response_type=token&state=123`;

  return (
    <div style={{ height:'100dvh',display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <a href={spotifyAuthUrl}><Button className='magic-text' style={{ backgroundColor: 'rgb(143, 183, 244)', color: 'white' }} variant='outline'>
        Connect your Spotify
      </Button></a>
    </div>
  )
}

export default LoginPage