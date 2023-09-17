import React, { useState, useRef } from 'react'
import './loginPage.css' 
import { Button } from '@chakra-ui/react'
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { HashLink as Link } from 'react-router-hash-link';

function LoginPage() {  

  const image = ['/background.png', '/background2.png', '/background3.png']  
  const ref = useRef(null)
  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const [current, setCurrent] = useState(0);
  const length = image.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(image) || image.length <= 0) {
    return null;
  }


  const CLIENT_ID = 'eb97cfb2685f42ffb18d0bf9f3c8fc8a';
  const REDIRECT_URI = 'http://127.0.0.1:5173/dashboard';
  

  // Spotify authorization URL
  const spotifyAuthUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user-library-read&response_type=token&state=123`;

  return (
    <>
      <div className="overall-container">
        <div className="login-container">
          <div className="intro-container" id="intro-type" style={{ height:'100dvh',display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:"center"}}>
            <h1 className="introduction"> Welcome to the Cover Page </h1>
            <p classname="intro2"> Log in With Spotify Below to Get Started, or See Our Featured Covers </p>
            <div className='spotify-button'>
              <a href={spotifyAuthUrl}>
                  <Button className='magic-bg' id="login-button" style={{ backgroundColor: 'rgb(143, 183, 244)', color: 'white', margin:"30px"}} variant='outline'>
                    Connect your Spotify
                  </Button>
              </a>
              <Button onClick={handleClick} className='magic-bg' id="login-button" style={{ backgroundColor: 'rgb(143, 183, 244)', color: 'white', margin:"30px"}} variant='outline'>
                See Featured Covers 
              </Button>
            </div>    
          </div>  
          <h1 className="feature" ref={ref}>Featured Covers!</h1>  
          <section className='slider'>
              <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} color="pink"/>
              <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} color="pink"/>
              {image.map((slide, index) => {
                return (
                  <div
                    className={index === current ? 'slide active' : 'slide'}
                    key={index}
                  >
                    {index === current && (
                      <img src={slide} alt='travel image' className='image' />
                    )}
                  </div>
                );
              })}
            </section> 
        </div>
       
      </div>
    </>
  )
}

export default LoginPage