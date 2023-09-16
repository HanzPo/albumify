import React from 'react'
import { Button, ButtonGroup } from '@chakra-ui/react'

function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  const CLIENT_ID = '0db42d67426a47d0bb0265da694bdf5c';
  const REDIRECT_URI = 'http://10.33.142.56:5173/dashboard';

  // Spotify authorization URL
  const spotifyAuthUrl = `https://accounts.spotify.com/authorize?client_id=0db42d67426a47d0bb0265da694bdf5c&redirect_uri=http://10.33.142.56:5173/dashboard&scope=user-library-read&response_type=token&state=123`;

  return (
    <div>
      <a href={spotifyAuthUrl}><Button rightIcon={<ArrowForwardIcon />} colorScheme='teal' variant='outline'>
    Connect your Spotify
  </Button></a>
    </div>
  )
}

export default LoginPage