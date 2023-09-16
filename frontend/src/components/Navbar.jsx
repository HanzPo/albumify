import React from 'react'
import './navbar.css'
import {Box, Flex, Heading, Spacer, Button} from '@chakra-ui/react'

function Navbar() {
    return (
      <Box bg="blue.400" p={4} color="white">
        <Flex alignItems="center" justifyContent="space-between">
          <Heading size="md">Cover Generator</Heading>
          <ul className="nav-menu">
            <li>
                <a href="/about"> About Us </a>
            </li>
            <li>
                <a href=""> Contact </a>
            </li>
            <li>
                <a href="">  </a>
            </li>
          </ul>
        </Flex>
      </Box>
    );
  }

export default Navbar