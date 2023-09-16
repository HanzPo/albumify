import React from 'react'
import { Button, ButtonGroup } from '@chakra-ui/react'

function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div>
      <Button onClick={} rightIcon={<ArrowForwardIcon />} colorScheme='teal' variant='outline'>
    Connect your Spotify
  </Button>
    </div>
  )
}

export default LoginPage