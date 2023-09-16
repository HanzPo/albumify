import { useState } from "react";
import "./App.css";
import { Button, ButtonGroup } from "@chakra-ui/react";

function App() {
  const [isLoading, setisLoading] = useState()
  const [currentPage, setCurrentPage] =useState()
  return (
    <>
      <Button colorScheme="blue">Button</Button>
    </>
  );
}

export default App;
