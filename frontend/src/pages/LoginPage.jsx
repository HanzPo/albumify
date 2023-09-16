import React, { useState } from 'react'
import './loginPage.css' 
import { Button, ButtonGroup } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import { Box, FormControl, FormLabel, Input } from '@chakra-ui/react';

function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  const CLIENT_ID = '0db42d67426a47d0bb0265da694bdf5c';
  const REDIRECT_URI = 'http://127.0.0.1:5173/dashboard';

  // Spotify authorization URL
  const spotifyAuthUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user-library-read&response_type=token&state=123`;

  return (
    <div>
      <Navbar />
      <div className="login" style={{ height:'100dvh',display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 className="introduction"> Welcome to the Cover Generator </h1>
        <h2 classname="intro2"></h2>
        <Box maxW="400px" mt="4" borderRadius="20px" boxShadow="6px 6px 8px 0px rgba(0, 0, 199, 0.2)">
          <form className="intro-form" marginTop="1000px">
            <FormControl id="name" isRequired>
              <FormLabel color="purple" padding='10px'>Name</FormLabel>
              <Input type="text" placeholder="Enter your name" />
            </FormControl>
            
            <FormControl id="email" isRequired mt="4" padding='10px'>
              <FormLabel color="purple"> Email </FormLabel>
              <Input type="email" placeholder="Enter your email" />
            </FormControl>
            <a href={spotifyAuthUrl}><Button className='magic-text' style={{ backgroundColor: 'rgb(143, 183, 244)', color: 'white', margin:"30px"}} variant='outline'>
              Connect your Spotify
            </Button></a>
          </form>
        </Box>
        
      </div>
    </div>
  )
}

export default LoginPage