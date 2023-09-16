import { useState } from "react";
import "./App.css";
import { Button, ButtonGroup, Spinner } from "@chakra-ui/react";
import LoginPage from "./pages/LoginPage";
// import Dashboard from "./pages/Dashboard";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState();

  if (isLoading) {
    return (
      <div className="loading-icon">
        <Spinner color="blue" thickness="4px" size="xl" />
      </div>
    );
  }

  return (
    <>
      <Button colorScheme="blue">Button</Button>
    </>
  );
}

export default App;
