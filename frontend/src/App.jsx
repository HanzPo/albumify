import { useState } from "react";
import "./App.css";
import { Button, ButtonGroup, Spinner } from "@chakra-ui/react";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";

function App() {
  const [isLoading, setisLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState();

  if (isLoading) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  return (
    <>
      <Button colorScheme="blue">Button</Button>
    </>
  );
}

export default App;
